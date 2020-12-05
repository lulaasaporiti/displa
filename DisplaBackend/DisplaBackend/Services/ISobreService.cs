using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ISobreService
    {
        List<Sobre> GetSobres();
        bool SaveOrUpdate(Sobre[] sobres);
        bool Delete(Sobre sobre);
        Sobre GetById(int idSobre);
    }

    public class SobreService : ISobreService
    {
        private ISobreDAO _sobreDAO;

        public SobreService(ISobreDAO sobreDAO)
        {
            _sobreDAO = sobreDAO;
        }

        public List<Sobre> GetSobres()
        {
            return _sobreDAO.GetSobres();
        }

        public bool SaveOrUpdate(Sobre[] sobres)
        {
            return _sobreDAO.SaveOrUpdate(sobres);

        }

        public bool Delete(Sobre sobre)
        {
            return _sobreDAO.Delete(sobre);
        }

        public Sobre GetById(int idSobre)
        {
            return _sobreDAO.GetById(idSobre);
        }

    }

}
