using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ILenteService
    {
        List<Lente> GetLentes();
        List<Lente> GetLentesVigentes();
        bool SaveOrUpdate(Lente lente);
        bool Delete(Lente lente);
        Lente GetById(int idLente);
    }

    public class LenteService : ILenteService
    {
        private ILenteDAO _lenteDAO;

        public LenteService(ILenteDAO lenteDAO)
        {
            _lenteDAO = lenteDAO;
        }

        public List<Lente> GetLentes()
        {
            return _lenteDAO.GetLentes();
        }

        public List<Lente> GetLentesVigentes()
        {
            return _lenteDAO.GetLentesVigentes();
        }

        public bool SaveOrUpdate(Lente lente)
        {
            return _lenteDAO.SaveOrUpdate(lente);

        }

        public bool Delete(Lente lente)
        {
            return _lenteDAO.Delete(lente);
        }

        public Lente GetById(int idLente)
        {
            return _lenteDAO.GetById(idLente);
        }

    }

}
