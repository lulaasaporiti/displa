using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ICategoriaIVAService
    {
        List<CategoriaIva> GetCategoriasIVA();
        List<CategoriaIva> GetCategoriasIVAVigentes();
        bool SaveOrUpdate(CategoriaIva categoriasIVA);
        bool Delete(CategoriaIva categoriaIVA);
        CategoriaIva GetById(int idCategoriaIVA);
    }

    public class CategoriaIVAService : ICategoriaIVAService
    {
        private ICategoriaIVADAO _categoriaIVADAO;

        public CategoriaIVAService(ICategoriaIVADAO categoriaIVADAO)
        {
            _categoriaIVADAO = categoriaIVADAO;
        }

        public List<CategoriaIva> GetCategoriasIVA()
        {
            return _categoriaIVADAO.GetCategoriasIVA();
        }

        public List<CategoriaIva> GetCategoriasIVAVigentes()
        {
            return _categoriaIVADAO.GetCategoriasIVAVigentes();
        }

        public bool SaveOrUpdate(CategoriaIva categoriaIVA)
        {
            return _categoriaIVADAO.SaveOrUpdate(categoriaIVA);

        }

        public bool Delete(CategoriaIva categoriaIVA)
        {
            return _categoriaIVADAO.Delete(categoriaIVA);
        }

        public CategoriaIva GetById(int idCategoriaIVA)
        {
            return _categoriaIVADAO.GetById(idCategoriaIVA);
        }

    }

}
