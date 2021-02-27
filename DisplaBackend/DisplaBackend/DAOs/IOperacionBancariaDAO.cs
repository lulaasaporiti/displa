using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IOperacionBancariaDAO
    {
        List<OperacionBancaria> GetOperacionesBancarias();
        //List<OperacionBancaria> GetOperacionesBancariasVigentes();
        OperacionBancaria SaveOrUpdate(OperacionBancaria operacion);
        bool Delete(OperacionBancaria operacion);
        OperacionBancaria GetById(int idOperacionBancaria);

    }

    public class OperacionBancariaDAO : IOperacionBancariaDAO
    {
        private readonly DisplaNEWContext _context;

        public OperacionBancariaDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<OperacionBancaria> GetOperacionesBancarias()
        {
            return _context.OperacionBancaria
                .ToList();
        }

        //public List<OperacionBancaria> GetOperacionesBancariasVigentes()
        //{
        //    return _context.OperacionBancaria
        //        .ToList();
        //}

        public OperacionBancaria SaveOrUpdate(OperacionBancaria operacion)
        {
            try
            {
                if (operacion.Id == 0)
                {
                    operacion.IdCuentaBancariaNavigation.IdBancoNavigation = null;
                    operacion.IdCuentaBancariaNavigation = null;
                    operacion.IdReciboNavigation = null;
                    operacion = _context.Add(operacion).Entity;
                }
                else
                {
                    operacion = _context.OperacionBancaria.Update(operacion).Entity;

                }
                _context.SaveChanges();
                return operacion;

            }
            catch (Exception e)
            {
                return null;
            }
        }

        public OperacionBancaria GetById(int idOperacionBancaria)
        {
            return _context.OperacionBancaria.FirstOrDefault(u => u.Id == idOperacionBancaria);
        }

        public bool Delete(OperacionBancaria operacion)
        {
            try
            {
                operacion = _context.OperacionBancaria.Update(operacion).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
