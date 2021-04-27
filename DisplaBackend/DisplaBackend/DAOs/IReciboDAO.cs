using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DisplaBackend.DAOs
{
    public interface IReciboDAO
    {
        List<Recibo> GetRecibos();
        List<Recibo> GetRecibosVigentes();
        bool SaveOrUpdate(Recibo recibo);
        bool Delete(Recibo recibo);
        Recibo GetById(int idRecibo);
        List<dynamic> BuscarRecibo(int idCliente, DateTime fechaDesde, DateTime fechaHasta);
    }

    public class ReciboDAO : IReciboDAO
    {
        private readonly DisplaNEWContext _context;

        public ReciboDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Recibo> GetRecibos()
        {
            return _context.Recibo
                .ToList();
        }

        public List<Recibo> GetRecibosVigentes()
        {
            return _context.Recibo
                .ToList();
        }

        public bool SaveOrUpdate(Recibo recibo)
        {
            try
            {
                if (recibo.Id == 0)
                {
                    recibo.IdCuentaBancariaNavigation.IdBancoNavigation = null;
                    recibo.IdClienteNavigation = null;
                    recibo.IdCuentaBancariaNavigation = null;
                    recibo.Fecha = DateTime.Now;
                    recibo = _context.Add(recibo).Entity;
                }
                else
                {
                    recibo.IdCuentaBancariaNavigation.IdBancoNavigation = null;
                    recibo.IdClienteNavigation = null;
                    recibo.IdCuentaBancariaNavigation = null;
                    recibo = _context.Recibo.Update(recibo).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Recibo GetById(int idRecibo)
        {
            return _context.Recibo
                .Include(r => r.IdClienteNavigation)
                .Include(r => r.IdUsuarioNavigation)
                .Include(r => r.IdUsuarioAnulacionNavigation)
                .Include(r => r.IdCuentaBancariaNavigation)
                    .ThenInclude(c => c.IdBancoNavigation)
                .FirstOrDefault(u => u.Id == idRecibo);
        }

        public bool Delete(Recibo recibo)
        {
            try
            {
                recibo = _context.Recibo.Update(recibo).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }

        public List<dynamic> BuscarRecibo(int idCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            if (idCliente > 0)
            {
                return _context.Recibo
                    .Include(c => c.IdClienteNavigation)
                    .Where(cc => cc.Fecha >= fechaDesde && cc.Fecha <= fechaHasta.AddDays(1) && idCliente == cc.IdCliente)
                   .Select(ca => new
                   {
                       Id = ca.Id,
                       Fecha = ca.Fecha,
                       FechaAnulado = ca.FechaAnulado,
                       Numero = ca.Numero,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       MontoTotal = ca.MontoCheque + ca.MontoEfectivo + ca.MontoInterdeposito,
                       IdTipoComprobanteNavigation = "Recibo"
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            else
            {
                return _context.Recibo
                    .Include(c => c.IdClienteNavigation)
                    .Where(cc => cc.Fecha >= fechaDesde && cc.Fecha <= fechaHasta.AddDays(1))
                   .Select(ca => new
                   {
                       Id = ca.Id,
                       Fecha = ca.Fecha,
                       FechaAnulado = ca.FechaAnulado,
                       Numero = ca.Numero,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       MontoTotal = ca.MontoCheque + ca.MontoEfectivo + ca.MontoInterdeposito,
                       IdTipoComprobanteNavigation = "Recibo"
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
        }
    }
}
