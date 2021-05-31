using System;
using DisplaBackend.Models;
using DisplaBackend.Models.AccountViewModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using DisplaBackend.Models.DTO;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IAccountDAO
    {
        List<AspNetRoles> GetRoles();
        List<UsuarioDTO> GetUsuarios();
        List<UsuarioDTO> GetUsuariosActivos();
        List<AspNetUsers> GetByRoleName(string roleName);
        AspNetUsers GetCurrentUser(string userName);
        int GetLastId();
        Task<bool> Edit(AspNetUsers user);
        AspNetUsers GetUser(int id);
        Task<bool> Activated(int id);
        void SetDatosPersonales(RegisterViewModel user);
        List<Funcion> GetFuncionesUsuario(int idUsuario);
    }

    public class AccountDAO : IAccountDAO
    {
        private readonly DisplaNEWContext _context;

        public AccountDAO(DisplaNEWContext context)
        {
            _context = context;
        }

        public List<AspNetUsers> GetByRoleName(string roleName)
        {
            throw new System.NotImplementedException();
        }

        public AspNetUsers GetCurrentUser(string userName)
        {
            return _context.AspNetUsers.Include(a => a.AspNetUserRoles)
                .ThenInclude(r => r.Role).FirstOrDefault(f => f.NormalizedUserName.Equals(userName.ToUpper()));
        }

        public int GetLastId()
        {
            try
            {
                return _context.AspNetUsers.Max(a => a.Id) + 1;
            }
            catch (Exception s)
            {
                //No hay ningun usuario creado, devuelvo uno
                return 1;
            }

        }

        public AspNetUsers GetUser(int id)
        {
            //var user = _context.AspNetUsers.Find(id);
            //return new AspNetUsers {
            //    Id = user.Id,
            //    UserName = user.UserName,
            //    NormalizedUserName = user.NormalizedUserName,
            //    Email = user.Email,
            //    AspNetUserRoles = user.AspNetUserRoles.Select(r => new AspNetRoles { Id = r.Role.Id, Name = r.Role.Name, NormalizedName = r.Role.NormalizedName }).OrderBy(o => o.NormalizedName).ToList()
            //}
            return _context.AspNetUsers
                .Include(a => a.AspNetUserRoles).ThenInclude(r => r.Role).FirstOrDefault(f => f.Id.Equals(id));
        }

        public List<AspNetRoles> GetRoles()
        {
            return _context.AspNetRoles.OrderBy(a => a.NormalizedName).ToList();
        }

        public List<UsuarioDTO> GetUsuarios()
        {
            var result = new List<UsuarioDTO>();
            var usuarios = _context.AspNetUsers
                .Include(e => e.AspNetUserRoles).ThenInclude(r => r.Role)
                .OrderByDescending(u => u.Activo)
                .ToList();
            foreach (var usuario in usuarios)
            {
                var item = new UsuarioDTO();
                item.Id = usuario.Id;
                item.Activo = usuario.Activo;
                item.Nombre = usuario.Nombre;
                item.Apellido = usuario.Apellido;
                item.NormalizedUserName = usuario.NormalizedUserName;
                item.UserName = usuario.UserName;
                item.Roles = usuario.AspNetUserRoles.Select(r => new RolesDTO { Id = r.Role.Id, Name = r.Role.Name, NormalizedName = r.Role.NormalizedName }).OrderBy(o => o.NormalizedName).FirstOrDefault();
                result.Add(item);
            }
            return result;
        }

        public List<UsuarioDTO> GetUsuariosActivos()
        {
            var result = new List<UsuarioDTO>();
            var usuarios = _context.AspNetUsers
                .Include(e => e.AspNetUserRoles).ThenInclude(r => r.Role)
                .Where(u => u.Activo == true)
                .OrderByDescending(u => u.Activo)
                .ToList();
            foreach (var usuario in usuarios)
            {
                var item = new UsuarioDTO();
                item.Id = usuario.Id;
                item.Activo = usuario.Activo;
                item.Nombre = usuario.Nombre;
                item.Apellido = usuario.Apellido;
                item.NormalizedUserName = usuario.NormalizedUserName;
                item.UserName = usuario.UserName;
                item.Roles = usuario.AspNetUserRoles.Select(r => new RolesDTO { Id = r.Role.Id, Name = r.Role.Name, NormalizedName = r.Role.NormalizedName }).OrderBy(o => o.NormalizedName).FirstOrDefault();
                result.Add(item);
            }
            return result;
        }

        public async Task<bool> Edit(AspNetUsers user)
        {
            _context.Entry(user).State = EntityState.Modified;
            return await _context.SaveChangesAsync() >= 1;
        }

        public async Task<bool> Activated(int id)
        {
            AspNetUsers user = _context.AspNetUsers.FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                user.Activo = !user.Activo;
            }
            return await _context.SaveChangesAsync() >= 1;
        }

        public async void SetDatosPersonales(RegisterViewModel user)
        {
            var usuario = _context.AspNetUsers.FirstOrDefault(u => u.NormalizedUserName.Equals(user.UserName.ToUpper()));
            if (usuario != null)
            {
                usuario.Nombre = user.Nombre;
                usuario.Apellido = user.Apellido;
                usuario.Activo = true;
                _context.Entry(usuario).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
        }

        public List<Funcion> GetFuncionesUsuario(int idUsuario) {
            return _context.UsuarioFuncion.Where(uf => uf.IdUsuario == idUsuario).Include(uf => uf.IdFuncionNavigation).Select(uf => uf.IdFuncionNavigation).ToList();
        }

    }

}