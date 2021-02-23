using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ICuentaBancariaDAO
    {
        List<CuentaBancaria> GetCuentasBancarias();
        List<CuentaBancaria> GetCuentasBancariasVigentes();
        bool SaveOrUpdate(CuentaBancaria cuenta);
        bool Delete(CuentaBancaria cuenta);
        CuentaBancaria GetById(int idCuentaBancaria);
        bool GetNumero(string numero, int id);

    }

    public class CuentaBancariaDAO : ICuentaBancariaDAO
    {
        private readonly DisplaNEWContext _context;

        public CuentaBancariaDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<CuentaBancaria> GetCuentasBancarias()
        {
            return _context.CuentaBancaria.Include(cu => cu.IdBancoNavigation)
                .ToList();
        }

        public bool GetNumero(string numero, int id)
        {
            if (_context.CuentaBancaria.FirstOrDefault(cu => cu.Numero == numero && cu.Id != id) != null)
            {
                return true;
            }
            else
            {
                return false;
            }

        }


        public List<CuentaBancaria> GetCuentasBancariasVigentes()
        {
            return _context.CuentaBancaria
                .Include(cu => cu.IdBancoNavigation)
                .Where(c => c.Borrado != true)
                .ToList();
        }

        public bool SaveOrUpdate(CuentaBancaria cuenta)
        {
            try
            {
                if (cuenta.Id == 0)
                {
                    cuenta = _context.Add(cuenta).Entity;
                }
                else
                {
                    cuenta = _context.CuentaBancaria.Update(cuenta).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public CuentaBancaria GetById(int idCuentaBancaria)
        {
            return _context.CuentaBancaria.FirstOrDefault(u => u.Id == idCuentaBancaria);
        }

        public bool Delete(CuentaBancaria cuenta)
        {
            try
            {
                cuenta.Borrado = !cuenta.Borrado;
                cuenta = _context.CuentaBancaria.Update(cuenta).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
