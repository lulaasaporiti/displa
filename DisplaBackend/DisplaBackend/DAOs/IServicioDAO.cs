using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
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
        List<Servicio> GetServiciosPrecios();
        bool SaveOrUpdate(Servicio servicio);
        bool Delete(Servicio servicio);
        Servicio GetById(int idServicio);
        bool SaveActualizacionPrecio(JObject[] porcentajePrecios);
        bool GenerarPrecioLista(int porcentaje, int lista);
        List<PrecioServicioCliente> GetCalibrados(int idCliente);
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
                .Where(s => s.Borrado == false)
                .Select(s => new Servicio
                {
                    Id = s.Id,
                    Nombre = s.Nombre,
                    IdTipoServicio = s.IdTipoServicio,
                    IdTipoServicioNavigation = s.IdTipoServicioNavigation,
                    Borrado = s.Borrado,
                    PrecioServicio = s.PrecioServicio.Select(p => new PrecioServicio { Id = p.Id, Precio = p.Precio, IdServicio = p.IdServicio }).OrderBy(p => p.Precio).ToList()
                })
                .ToList();
        }

        public List<Servicio> GetServiciosPrecios()
        {
            List<Servicio> servicios = _context.Servicio
                .Where(s => s.Borrado == false)
                .Select(s => new Servicio
                {
                    Id = s.Id,
                    Nombre = s.Nombre,
                    IdTipoServicio = s.IdTipoServicio,
                    IdTipoServicioNavigation = s.IdTipoServicioNavigation,
                    Borrado = s.Borrado,
                    PrecioServicio = s.PrecioServicio
                        .Where(p => p.PrecioServicioCliente.Where(pc => pc.Especial == true).Count() == 0)
                        .Select(p => new PrecioServicio { Id = p.Id, Precio = p.Precio, IdServicio = p.IdServicio, IdServicioNavigation = p.IdServicioNavigation })
                        .OrderBy(p => p.Precio).ToList()
                })
                .ToList();

            servicios.GroupBy(a => a.IdTipoServicio);
            return servicios;
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
                    List<PrecioServicio> precioServicioNuevos = servicio.PrecioServicio.ToList();
                    servicio.PrecioServicio = null;

                    servicio = _context.Servicio.Update(servicio).Entity;

                    if (precioServicioNuevos.Count > 0)
                    {
                        precioServicioNuevos.ForEach(p =>
                        {
                            if (p.Id == 0)
                            {
                                _context.PrecioServicio.Add(p);
                            }
                            else
                            {
                                var precioBBDD = _context.PrecioServicio.FirstOrDefault(ps => ps.Id == p.Id && ps.IdServicio == p.IdServicio && ps.Precio == p.Precio);
                                if (precioBBDD == null)
                                {
                                    _context.PrecioServicio.Update(p);
                                }
                            }
                        });
                    }

                    List<PrecioServicio> precioServicioDDBB = _context.PrecioServicio.Where(pl => pl.IdServicio == servicio.Id).ToList();
                    precioServicioDDBB.ForEach(p =>
                    {
                        if (precioServicioNuevos.Find(ps => ps.Id == p.Id) == null)
                        {
                            _context.PrecioServicio.Remove(p);
                        }
                    });

                }
                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool SaveActualizacionPrecio(JObject[] porcentajePrecios)
        {
            try
            {
                if (porcentajePrecios != null)
                {
                    int precio = 0;
                    int porcentaje = 0;
                    var precioServicio = new PrecioServicio();

                    foreach (var p in porcentajePrecios)
                    {
                        precio = Convert.ToInt32(p.GetValue("IdPrecio"));
                        porcentaje = Convert.ToInt32(p.GetValue("Porcentaje"));
                        precioServicio = _context.PrecioServicio.Find(precio);
                        precioServicio.Precio = Math.Round(precioServicio.Precio + ((precioServicio.Precio * porcentaje) / 100), 2);
                        _context.PrecioServicio.Update(precioServicio);
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
            return _context.Servicio.Include(s => s.PrecioServicio).FirstOrDefault(tb => tb.Id == idServicio);
        }

        public bool GenerarPrecioLista(int porcentaje, int lista)
        {
            try
            {
                List<Servicio> servicios = GetServiciosPrecios();

                List<PrecioServicio> precios = new List<PrecioServicio>();

                foreach (var s in servicios)
                {
                    var precio = new PrecioServicio();

                    if (s.PrecioServicio.Count >= lista)
                    {
                        if (s.PrecioServicio.ElementAt(lista - 1) != null)
                        {
                            precio.Id = s.PrecioServicio.ElementAt(lista - 1).Id;
                        }
                    }
                    precio.IdServicio = s.Id;
                    precio.Precio = Math.Round(s.PrecioServicio.ElementAt(0).Precio + ((s.PrecioServicio.ElementAt(0).Precio * porcentaje) / 100), 2);
                    precios.Add(precio);
                }

                foreach (var p in precios)
                {
                    if (p.Id == 0)
                    {
                        _context.PrecioServicio.Add(p);
                    }
                    else
                    {
                        _context.PrecioServicio.Update(p);
                    }
                }

                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
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

        public List<PrecioServicioCliente> GetCalibrados(int idCliente)
        {
            return _context.PrecioServicioCliente
                .Include(b => b.IdPrecioServicioNavigation)
                .ThenInclude(b => b.IdServicioNavigation)
                .Where(b => b.IdPrecioServicioNavigation.IdServicioNavigation.Nombre.Contains("CAL") && !b.IdPrecioServicioNavigation.IdServicioNavigation.Borrado && b.IdCliente == idCliente).ToList();
        }

    }
}
