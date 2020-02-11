﻿using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IServicioDAO
    {
        List<Servicio> GetServicios();
        List<Servicio> GetServiciosVigentes();
        bool SaveOrUpdate(Servicio servicio);
        bool Delete(Servicio servicio);
        Servicio GetById(int idServicio);

    }

    public class ServicioDAO : IServicioDAO
    {
        private readonly DisplaNEWContext _context;

        public ServicioDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Servicio> GetServicios()
        {
            return _context.Servicio
                .Include(b => b.IdTipoServicioNavigation)
                .Include(b => b.PrecioServicio)
                .OrderByDescending(b => b.Borrado)
                .ToList();
        }

        public List<Servicio> GetServiciosVigentes()
        {
            return _context.Servicio
                .Include(i => i.IdTipoServicioNavigation)
                .Where(i => i.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(Servicio servicio)
        {
            try
            {
                if (servicio.Id == 0)
                {
                    servicio = _context.Add(servicio).Entity;
                    servicio.PrecioServicio.ToList().ForEach(p =>
                    {
                        p.IdServicio = servicio.Id;
                        p.Precio = p.Precio;
                        _context.PrecioServicio.Add(p);
                    });
                }
                else
                {
                    var precioServicio = _context.PrecioServicio.Where(s => s.IdServicio == servicio.Id).ToList();
                    if (precioServicio.Count() > 0)
                    {
                        foreach (var p in precioServicio)
                        {
                            _context.PrecioServicio.Remove(p);
                        }
                        _context.SaveChanges();
                    }

                    List<PrecioServicio> precioServicioNuevos = servicio.PrecioServicio.ToList();
                    servicio.PrecioServicio = null;

                    servicio = _context.Servicio.Update(servicio).Entity;

                    if (precioServicioNuevos != null)
                    {
                        precioServicioNuevos.ForEach(p =>
                        {
                            p.Id = 0;
                            p.IdServicio = servicio.Id;
                            p.IdServicioNavigation = null;
                            _context.PrecioServicio.Add(p);
                        });
                    }
                }
                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Servicio GetById(int idServicio)
        {
            return _context.Servicio.FirstOrDefault(tb => tb.Id == idServicio);
        }

        public bool Delete(Servicio servicio)
        {
            try
            {
                servicio.Borrado = !servicio.Borrado;
                servicio = _context.Servicio.Update(servicio).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
