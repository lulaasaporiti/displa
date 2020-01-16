using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.Models.DTO
{
    public class UsuarioDTO
    {
        public UsuarioDTO() { }

        public int Id { get; set; }
        public string NormalizedUserName { get; set; }
        public string UserName { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public bool? Activo { get; set; }
        public string Mail { get; set; }
        public RolesDTO Roles { get; set; }
    }

    public class RolesDTO
    {
        public RolesDTO() { }

        public int Id { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
    }

    public class EditUsuarioDTO
    {
        public EditUsuarioDTO() { }

        public int Id { get; set; }
        public string NormalizedUserName { get; set; }
        public string UserName { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Mail { get; set; }
        public RolesDTO Roles { get; set; }
    }
}