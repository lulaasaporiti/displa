﻿using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DisplaBackend.DAOs
{
    public interface ITipoServicioDAO
    {
        List<TipoServicio> GetTiposServicio();
        List<TipoServicio> GetTiposServicioVigentes();
        bool SaveOrUpdate(TipoServicio tipoServicio);
        bool Delete(TipoServicio tipoServicio);
        TipoServicio GetById(int idTipoServicio);
        List<TipoServicio> GetTiposServicioConServicios();
        List<TipoServicio> GetServiciosSinCalibrados(int idCliente);

    }

    public class TipoServicioDAO : ITipoServicioDAO
    {
        private readonly DisplaNEWContext _context;

        public TipoServicioDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<TipoServicio> GetTiposServicio()
        {
            return _context.TipoServicio
                .OrderByDescending(ti => ti.Borrado)
                .ToList();
        }

        public List<TipoServicio> GetTiposServicioVigentes()
        {
            return _context.TipoServicio
                .Include(ti => ti.Servicio)
                .Where(ti => ti.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(TipoServicio tipoServicio)
        {
            try
            {
                if (tipoServicio.Id == 0)
                {
                    tipoServicio = _context.Add(tipoServicio).Entity;
                }
                else
                {
                    tipoServicio = _context.TipoServicio.Update(tipoServicio).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public TipoServicio GetById(int idTipoServicio)
        {
            return _context.TipoServicio.FirstOrDefault(tb => tb.Id == idTipoServicio);
        }

        public bool Delete(TipoServicio tipoServicio)
        {
            try
            {
                tipoServicio.Borrado = !tipoServicio.Borrado;
                tipoServicio = _context.TipoServicio.Update(tipoServicio).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }

        public List<TipoServicio> GetTiposServicioConServicios()
        {
            return _context.TipoServicio
                .Where(ti => ti.Borrado == false && ti.Servicio.Count > 0)
                .ToList();
        }

        public List<TipoServicio> GetServiciosSinCalibrados(int idCliente)
        {
            List<TipoServicio> lista = _context.TipoServicio
               .Include(ti => ti.Servicio)
               .ThenInclude(s => s.PrecioServicio)
               .ThenInclude(c => c.PrecioServicioCliente)
               .Where(ti => ti.Borrado == false && ti.Servicio.Any(s => !s.Borrado && !s.Nombre.Contains("CAL")))
               .Select(ti => new TipoServicio()
               {
                   Id = ti.Id,
                   Nombre = ti.Nombre,
                   Servicio = ti.Servicio.Select(s => new Servicio()
                   {
                       Id = s.Id,
                       Nombre = s.Nombre,
                       DescripcionFactura = s.DescripcionFactura,
                       PrecioServicio = s.PrecioServicio.Where(ps => ps.PrecioServicioCliente.Any(psc => psc.IdCliente == idCliente))
                      .Select(x => new PrecioServicio()
                      {
                          Id = x.Id,
                          Precio = x.Precio
                      }).ToList()
                   }).ToList()
               }).ToList();
            return lista;
        }
    }
}
