using DisplaBackend.DAOs;
using DisplaBackend.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ILenteService
    {
        List<Lente> GetLentes();
        List<Lente> GetLentesVigentes();
        List<dynamic> GetLentesVigentesAgrupados();
        bool SaveOrUpdate(Lente lente);
        bool Delete(Lente lente);
        Lente GetById(int idLente);
        int GetLastCode();
        List<string> GetCombinaciones();
        bool SaveActualizacionPrecio(JObject[] porcentajePrecios);
        bool GenerarPrecioLista(int porcentaje, int lista);
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

        public List<dynamic> GetLentesVigentesAgrupados()
        {
            return _lenteDAO.GetLentesVigentesAgrupados();
        }

        public List<string> GetCombinaciones()
        {
            return _lenteDAO.GetCombinaciones();
        }

        public int GetLastCode()
        {
            return _lenteDAO.GetLastCode();
        }

        public bool SaveOrUpdate(Lente lente)
        {
            return _lenteDAO.SaveOrUpdate(lente);

        }

        public bool GenerarPrecioLista(int porcentaje, int lista)
        {
            return _lenteDAO.GenerarPrecioLista(porcentaje, lista);

        }

        public bool SaveActualizacionPrecio(JObject[] porcentajePrecios)
        {
            return _lenteDAO.SaveActualizacionPrecio(porcentajePrecios);

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
