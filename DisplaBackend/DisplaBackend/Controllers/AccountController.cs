using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DisplaBackend.Helpers;
using DisplaBackend.Models;
using DisplaBackend.Models.AccountViewModels;
using DisplaBackend.Models.DTO;
using DisplaBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Web;

namespace DisplaBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;
        private IConfiguration _config;
        private IAccountService _accountService;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<AccountController> logger,
            IConfiguration config,
            IAccountService accountService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _config = config;
            _accountService = accountService;
        }

        // GET: api/Account/GetRoles
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetRoles()
        {
            var result = _accountService.GetRoles();
            return Ok(result);
        }


        // GET: api/Account/GetUsuarios
        [HttpGet]
        public IActionResult GetUsuarios()
        {
            var result = _accountService.GetUsuarios();
            return Json(result);
        }

        [HttpGet]
        public IActionResult GetUsuariosActivos()
        {
            var result = _accountService.GetUsuariosActivos();
            return Json(result);
        }

        // GET: api/Account/GetResponsable/6
        [HttpGet("{id}")]
        public IActionResult GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var responsable = _accountService.GetUser(id);

            return Ok(responsable);
        }

        [HttpGet]
        public async Task<IActionResult> GetByRoleName(string roleName)
        {
            IList<ApplicationUser> users = await _userManager.GetUsersInRoleAsync(roleName);
            //List<AspNetUsers> data = _accountService.GetByRoleName(users);
            List<AspNetUsers> data = _accountService.GetByRoleName(roleName);

            return Json(data);
        }

        // POST: api/Account/Login
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return Ok(new { token = BuildToken(model).Result });
                }
                //if (result.RequiresTwoFactor)
                //{
                //    return RedirectToAction(nameof(LoginWith2fa), new { returnUrl, model.RememberMe });
                //}
                //if (result.IsLockedOut)
                //{
                //    //_logger.LogWarning("User account locked out.");
                //    return RedirectToAction(nameof(Lockout));
                //}

                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return BadRequest();
            }

            // If we got this far, something failed, redisplay form
            //return View(model);
            return BadRequest();
        }

        // POST: api/Account/Register
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var lastId = _accountService.GetLastId();

                //Alejo no quiere mails, por eso hay que crearlos con un mail random.
                var email = RandomString(5, true);

                var user = new ApplicationUser
                {
                    //Id = lastId,
                    UserName = model.UserName,
                    Email = email + "@hotmail.com"

                };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                    //await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);
                    _accountService.SetDatosPersonales(model);
                    await _userManager.AddToRoleAsync(user, model.Roles);
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    //return Ok(new { token = BuildToken(new LoginViewModel { UserName = model.UserName, Password = model.Password }) });
                    return Ok(true);
                }
            }

            // If we got this far, something failed, redisplay form
            return BadRequest();
        }

        // POST: api/Account/Logout
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        // DELETE: api/Account/23
        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            if (String.IsNullOrWhiteSpace(id)) return BadRequest();

            ApplicationUser user = await _userManager.FindByIdAsync(id);
            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        //PUT: api/Account/Edit
        [HttpPut]
        //[EnableCors("AgendaAPIDevPolicy")]
        public async Task<IActionResult> Edit([FromBody]EditUsuarioDTO usuarioEditado)
        {
            if (usuarioEditado == null)
            {
                return BadRequest();
            }

            AspNetUsers user = _accountService.GetUser(usuarioEditado.Id);
            user.Apellido = usuarioEditado.Apellido;
            user.Nombre = usuarioEditado.Nombre;
            _accountService.Edit(user);
            ApplicationUser ap = await _userManager.FindByIdAsync(user.Id.ToString());
            var resultDeleteRoles = await _userManager.RemoveFromRolesAsync(ap, user.AspNetUserRoles.Select(s => s.Role.Name));

            if (resultDeleteRoles.Succeeded)
            {
                var resultAddRoles = await _userManager.AddToRoleAsync(ap, usuarioEditado.Roles.Name);
                if (resultAddRoles.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        private async Task<string> BuildToken(LoginViewModel user)
        {
            var usuario = _accountService.GetCurrentUser(user.UserName);
            // Resolve the user via their username
            var applicationUser = await _userManager.FindByNameAsync(usuario.UserName);
            // Get the roles for the user
            var roles = await _userManager.GetRolesAsync(applicationUser);
            var claims = new[] {
                new Claim("idUser", usuario.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("roles", JsonConvert.SerializeObject(roles)),
                new Claim("activo", usuario.Activo.ToString())
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.UtcNow.AddMinutes(1),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //[HttpDelete("{id}"), Route("Activated")]
        [HttpDelete]
        public async Task<IActionResult> Activated(int id)
        {
            return Json(await _accountService.Activated(id));
        }

        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (!changePasswordResult.Succeeded)
            {
                AddErrors(changePasswordResult);
                //return View(model);
                return Ok(false);
            }

            await _signInManager.SignInAsync(user, isPersistent: false);
            _logger.LogInformation("User changed their password successfully.");
            //StatusMessage = "Your password has been changed.";

            //return RedirectToAction(nameof(ChangePassword));
            return Ok(true);

        }

        #region Helpers
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Home", "Index", "Home");
            }
        }
        #endregion

        [HttpGet]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(string model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model);
                if (user == null
                    //|| !(await _userManager.IsEmailConfirmedAsync(user))
                    )
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    //return RedirectToAction(nameof(ForgotPasswordConfirmation));
                    return Json("No encontró el usuario");
                }

                // For more information on how to enable account confirmation and password reset please
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                string code = await _userManager.GeneratePasswordResetTokenAsync(user);
                //var callbackUrl = Url.ResetPasswordCallbackLink(user.Email, code, Request.Scheme);
                var callbackUrl = Url.Action("ResetPassword", "Account",
                        new { UserId = user.Id, code = code }, protocol: Request.Scheme);
                //await _emailSender.SendEmailAsync(model, "Cambiar contraseña",
                //   $"Por favor cambie su contraseña ingresando en: <a href='{callbackUrl}'>link</a>");

                //dynamic result = new JObject();
                //result.email = user.Email;
                //result.code = code;

                return Json(code);
            }

            // If we got this far, something failed, redisplay form
            //return View(model);
            return Json("No encontró el usuario");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string code = null)
        {
            if (code == null)
            {
                throw new ApplicationException("A code must be supplied for password reset.");
            }
            var model = new ResetPasswordViewModel { Code = code };
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction(nameof(ResetPasswordConfirmation));
            }
            //var Code = HttpUtility.UrlEncode(model.Code);
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                //return RedirectToAction(nameof(ResetPasswordConfirmation));
                return Ok(true);
            }
            AddErrors(result);
            //return BadRequest();
            return Ok(false);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        public string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }
    }
}