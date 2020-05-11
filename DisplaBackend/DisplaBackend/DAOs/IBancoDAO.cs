using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IBancoDAO
    {
        List<Banco> GetBancos();
        List<Banco> GetBancosVigentes();
        bool SaveOrUpdate(Banco banco);
        bool Delete(Banco banco);
        Banco GetById(int idBanco);

    }

    public class BancoDAO : IBancoDAO
    {
        private readonly DisplaNEWContext _context;

        public BancoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Banco> GetBancos()
        {
            return _context.Banco
                .OrderByDescending(p => p.Borrado)
                .ToList();
        }

        public List<Banco> GetBancosVigentes()
        {
            return _context.Banco
                .Where(p => p.Borrado == false || p.Borrado == null)
                .ToList();
        }

        public bool SaveOrUpdate(Banco banco)
        {
            try
            {
                if (banco.Id == 0)
                {
                    banco = _context.Add(banco).Entity;
                }
                else
                {
                    banco = _context.Banco.Update(banco).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Banco GetById(int idBanco)
        {
            return _context.Banco.FirstOrDefault(tb => tb.Id == idBanco);
        }

        public bool Delete(Banco banco)
        {
            try
            {
                banco.Borrado = !banco.Borrado;
                banco = _context.Banco.Update(banco).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
