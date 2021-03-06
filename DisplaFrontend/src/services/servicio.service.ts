import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServicioService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Servicio';

    constructor(private http: HttpClient) { }

    getServiciosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetServicios`);
    }

    getCantidadListas(): Observable<any>{
        return this.http.get(`${this.baseUrl}/GetCantidadListas`)
    }

    getCalibrados(idCliente): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetCalibrados?idCliente=${idCliente}`);
    }

    getServiciosVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetServiciosVigentes`);
    }

    getServiciosPrecios(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetServiciosPrecios`);
    }

    saveActualizacionPrecio(porcentajesServicio: Object[]):  Observable<object> {
        return this.http.put(`${this.baseUrl}/`, porcentajesServicio);
    }

    saveOrUpdateServicio(servicio: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, servicio);
    }

    updateServicio(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteServicio(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    generarPrecioLista(generarPrecio: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/GenerarPrecioLista`, generarPrecio);
    }
}