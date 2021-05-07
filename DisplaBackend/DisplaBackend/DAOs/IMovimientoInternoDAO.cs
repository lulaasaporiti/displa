using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IMovimientoInternoDAO
    {
        List<MovimientoInterno> GetMovimientoInternos();
        List<MovimientoInterno> GetMovimientoInternosVigentes();
        bool SaveOrUpdate(MovimientoInterno movimientoInterno);
        bool Delete(MovimientoInterno movimientoInterno);
        MovimientoInterno GetById(int idMovimientoInterno);
        List<dynamic> BuscarMovimiento(int idCliente, DateTime fechaDesde, DateTime fechaHasta);
    }

    public class MovimientoInternoDAO : IMovimientoInternoDAO
    {
        private readonly DisplaNEWContext _context;

        public MovimientoInternoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<MovimientoInterno> GetMovimientoInternos()
        {
            return _context.MovimientoInterno
                .ToList();
        }

        public List<MovimientoInterno> GetMovimientoInternosVigentes()
        {
            return _context.MovimientoInterno
                .ToList();
        }

        public bool SaveOrUpdate(MovimientoInterno movimientoInterno)
        {
            try
            {
                if (movimientoInterno.Id == 0)
                {
                    movimientoInterno.IdClienteNavigation = null;
                    movimientoInterno = _context.Add(movimientoInterno).Entity;
                }
                else
                {
                    movimientoInterno = _context.MovimientoInterno.Update(movimientoInterno).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public MovimientoInterno GetById(int idMovimientoInterno)
        {
            return _context.MovimientoInterno
                .Include(m => m.IdTipoComprobanteNavigation)
                .Include(m => m.IdClienteNavigation)
                .Include(m => m.IdProveedorNavigation)
                .FirstOrDefault(u => u.Id == idMovimientoInterno);
        }

        public bool Delete(MovimientoInterno movimientoInterno)
        {
            try
            {
                movimientoInterno = _context.MovimientoInterno.Update(movimientoInterno).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }

        public List<dynamic> BuscarMovimiento(int idCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            if (idCliente > 0)
            {
                return _context.MovimientoInterno
                    .Include(c => c.IdTipoComprobanteNavigation)
                    .Include(c => c.IdClienteNavigation)
                    .Where(cc => cc.Fecha >= fechaDesde && cc.Fecha <= fechaHasta.AddDays(1) && idCliente == cc.IdCliente)
                   .Select(ca => new
                   {
                       Id = ca.Id,
                       IdTipoComprobante = ca.IdTipoComprobante,
                       IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                       Fecha = ca.Fecha,
                       FechaAnulado = ca.FechaAnulado,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       MontoTotal = ca.Monto
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            else
            {
                return _context.MovimientoInterno
                    .Include(c => c.IdTipoComprobanteNavigation)
                    .Include(c => c.IdClienteNavigation)
                    .Where(cc => cc.Fecha >= fechaDesde && cc.Fecha <= fechaHasta.AddDays(1) && cc.IdCliente != null)
                   .Select(ca => new
                   {
                       Id = ca.Id,
                       IdTipoComprobante = ca.IdTipoComprobante,
                       IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                       Fecha = ca.Fecha,
                       FechaAnulado = ca.FechaAnulado,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       MontoTotal = ca.Monto
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
        }
    }
}
