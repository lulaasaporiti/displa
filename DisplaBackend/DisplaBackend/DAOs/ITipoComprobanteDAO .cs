using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ITipoComprobanteDAO
    {
        List<TipoComprobante> GetTiposComprobante();
        bool SaveOrUpdate(TipoComprobante tipoInsumo);
        bool Delete(TipoComprobante tipoComprobante);
        TipoComprobante GetById(int idTipoComprobante);

    }

    public class TipoComprobanteDAO : ITipoComprobanteDAO
    {
        private readonly DisplaNEWContext _context;

        public TipoComprobanteDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<TipoComprobante> GetTiposComprobante()
        {
            return _context.TipoComprobante
                .OrderByDescending(ti => ti.Codigo)
                .ToList();
        }

        //public List<TipoInsumo> GetTiposComprobanteVigentes()
        //{
        //    return _context.TipoComprobante
        //        .Where(ti => ti.Borrado == false)
        //        .ToList();
        //}

        public bool SaveOrUpdate(TipoComprobante tipoComprobante)
        {
            try
            {
                if (tipoComprobante.Id == 0)
                {
                    tipoComprobante = _context.Add(tipoComprobante).Entity;
                }
                else
                {
                    tipoComprobante = _context.TipoComprobante.Update(tipoComprobante).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public TipoComprobante GetById(int idTipoComprobante)
        {
            return _context.TipoComprobante.FirstOrDefault(tb => tb.Id == idTipoComprobante);
        }

        public bool Delete(TipoComprobante tipoComprobante)
        {
            try
            {
                _context.TipoComprobante.Remove(tipoComprobante);
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
