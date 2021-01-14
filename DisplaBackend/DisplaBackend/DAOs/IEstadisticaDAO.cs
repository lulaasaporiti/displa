using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IEstadisticaDAO
    {
        List<ComprobanteItem> GetDetalleArticulos();

    }

    public class EstadisticaDAO : IEstadisticaDAO
    {
        private readonly DisplaNEWContext _context;

        public EstadisticaDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<ComprobanteItem> GetDetalleArticulos()
        {
            return _context.ComprobanteItem
                .ToList();
        }

    }
}
