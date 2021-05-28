﻿using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IFuncionDAO
    {
        List<Funcion> GetFunciones();
        Funcion GetById(int idFuncion);
        List<dynamic> GetFuncionesArupadas();
    }

    public class FuncionDAO : IFuncionDAO
    {
        private readonly DisplaNEWContext _context;

        public FuncionDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Funcion> GetFunciones()
        {
            return _context.Funcion.Include(f => f.IdFuncionPadreNavigation)
                .ToList();
        }

        
        public Funcion GetById(int idFuncion)
        {
            return _context.Funcion.FirstOrDefault(u => u.Id == idFuncion);
        }

        public List<dynamic> GetFuncionesArupadas()
        {
            return _context.Funcion.Include(f => f.IdFuncionPadreNavigation)
                .Select(f => new
                {
                    f,
                    //f.UsuarioFuncion
                })
                .ToList<dynamic>();
        }
        
    }
}
