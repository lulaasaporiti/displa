using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IMovimientoInsumoService
    {
        List<MovimientoInsumo> GetMovimientosInsumo(int idInsumo);
        bool SaveOrUpdate(MovimientoInsumo movimientoInsumo);
        bool Delete(MovimientoInsumo movimientoInsumo);
        MovimientoInsumo GetById(int idMovimientoInsumo);
    }

    public class MovimientoInsumoService : IMovimientoInsumoService
    {
        private IMovimientoInsumoDAO _movimientoInsumoDAO;
        private IInsumoDAO _insumoDAO;


        public MovimientoInsumoService(IMovimientoInsumoDAO movimientoInsumoDAO, IInsumoDAO insumoDAO)
        {
            _movimientoInsumoDAO = movimientoInsumoDAO;
            _insumoDAO = insumoDAO;
        }

        public List<MovimientoInsumo> GetMovimientosInsumo(int idInsumo)
        {
            return _movimientoInsumoDAO.GetMovimientosInsumo(idInsumo);
        }

        public bool SaveOrUpdate(MovimientoInsumo movimientoInsumo)
        {
            Insumo insumo = _insumoDAO.GetById(movimientoInsumo.IdInsumo);
            try {
                if (movimientoInsumo.TipoMovimiento == "Alta")
                {
                    insumo.StockActual = insumo.StockActual + movimientoInsumo.Cantidad;
                }
                else {
                    insumo.StockActual = insumo.StockActual - movimientoInsumo.Cantidad;
                }
                
                _movimientoInsumoDAO.SaveOrUpdate(movimientoInsumo);
                return  _insumoDAO.SaveOrUpdate(insumo);

            }
            catch (Exception e)
            {
                return false;
            }

        }

        public bool Delete(MovimientoInsumo movimientoInsumo)
        {
            return _movimientoInsumoDAO.Delete(movimientoInsumo);
        }

        public MovimientoInsumo GetById(int idMovimientoInsumo)
        {
            return _movimientoInsumoDAO.GetById(idMovimientoInsumo);
        }

    }

}
