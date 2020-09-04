import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Cliente';

    constructor(private http: HttpClient, private mainService: MainService) { }

    getClientesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetClientes`);
    }

    getClientesBloqueados(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetClientesBloqueados`);
    }
    
    getClientesVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetClientesVigentes`);
    }

    getClientesActivosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetClientesActivos`);
    }
    
    saveOrUpdateCliente(cliente: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, cliente);
    }

    updateCliente(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteCliente(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    getPreciosArticulosCliente(idCliente): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetPreciosArticulosCliente?idCliente=${idCliente}`);
    }
    
    getPreciosServiciosCliente(idCliente): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetPreciosServiciosCliente?idCliente=${idCliente}`);
    }
    
    getPreciosLentesCliente(idCliente): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetPreciosLentesCliente?idCliente=${idCliente}`);
    }

    getFicha(idCliente): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetFichaCliente?idCliente=${idCliente}`);
    }

    savePreciosArticulos(precios): Observable<object> {
        return this.http.post(`${this.baseUrl}/SavePreciosArticulos`, precios);
    }

    savePreciosServicios(precios): Observable<object> {
        return this.http.post(`${this.baseUrl}/SavePreciosServicios`, precios);
    }

    savePreciosLentes(precios): Observable<object> {
        return this.http.post(`${this.baseUrl}/SavePreciosLentes`, precios);
    }

    saveFicha(ficha): Observable<object> {
        return this.http.post(`${this.baseUrl}/SaveFicha`, ficha);
    }

    asignarPreciosLentes(preciosLentes): Observable<any> {
        return this.http.post(`${this.baseUrl}/AsignarPreciosLentes`, preciosLentes);
    }

    asignarPreciosServicios(preciosServicios): Observable<any> {
        return this.http.post(`${this.baseUrl}/AsignarPreciosServicios`, preciosServicios);
    }

    asignarPreciosArticulos(preciosArticulos): Observable<any> {
        return this.http.post(`${this.baseUrl}/AsignarPreciosArticulos`, preciosArticulos);
    }

    getListaAsignacionLente(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetListaAsignacionLente`);
    }
}