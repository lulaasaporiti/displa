import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})
export class ComprobanteProveedorService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'ComprobanteProveedor';
    // mainService: any;

    constructor(private http: HttpClient, private mainService: MainService) { }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    
    getComprobantesProveedorList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetComprobantesProveedor`);
    }
    
    saveOrUpdateComprobanteProveedor(comprobante: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, comprobante);
    }

    updateComprobanteProveedor(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteComprobanteProveedor(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    
    getBusquedaComprobante(idProveedor, fechaDesde, fechaHasta): Observable<any> {
        return this.mainService.get(`ComprobanteProveedor/BuscarComprobante`, {
            idProveedor: idProveedor,
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta
        });
    }
}