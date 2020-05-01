using System.Collections.Generic;
using System.Threading.Tasks;
using DisplaBackend.DAOs;
using DisplaBackend.Helpers;
using DisplaBackend.Models;
using DisplaBackend.Models.AccountViewModels;
using DisplaBackend.Models.DTO;

namespace DisplaBackend.Services
{
    public interface IAccountService
    {
        List<AspNetRoles> GetRoles();
        List<UsuarioDTO> GetUsuarios();
        List<UsuarioDTO> GetUsuariosActivos();
        List<AspNetUsers> GetByRoleName(string roleName);
        AspNetUsers GetCurrentUser(string userName);
        int GetLastId();
        AspNetUsers GetUser(int id);
        void Edit(AspNetUsers user);
        Task<bool> Activated(int id);
        void SetDatosPersonales(RegisterViewModel user);
    }

    public class AccountService : IAccountService
    {
        private IAccountDAO _accountDAO;

        public AccountService(IAccountDAO accountDAO)
        {
            _accountDAO = accountDAO;
        }

        public List<AspNetUsers> GetByRoleName(string roleName)
        {
            return _accountDAO.GetByRoleName(roleName);
        }

        public AspNetUsers GetCurrentUser(string userName)
        {
            return _accountDAO.GetCurrentUser(userName);
        }

        public int GetLastId()
        {
            return _accountDAO.GetLastId();
        }

        public AspNetUsers GetUser(int id)
        {
            return _accountDAO.GetUser(id);
        }

        public List<AspNetRoles> GetRoles()
        {
            return _accountDAO.GetRoles();
        }

        public List<UsuarioDTO> GetUsuarios()
        {
            return _accountDAO.GetUsuarios();
        }

        public List<UsuarioDTO> GetUsuariosActivos()
        {
            return _accountDAO.GetUsuariosActivos();
        }

        public void Edit(AspNetUsers user)
        {
            _accountDAO.Edit(user);
        }

        public Task<bool> Activated(int id)
        {
            return _accountDAO.Activated(id);
        }

        public void SetDatosPersonales(RegisterViewModel user) {
            _accountDAO.SetDatosPersonales(user);
        }
    }
}