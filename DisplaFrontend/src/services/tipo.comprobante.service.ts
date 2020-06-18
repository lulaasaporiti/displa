import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TipoComprobanteService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'TipoComprobante';

    constructor(private http: HttpClient) { }

    getTiposComprobantesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposComprobante`);
    }
    
    saveOrUpdateTipoComprobante(tipoComprobante: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, tipoComprobante);
    }

    updateTipoComprobante(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteTipoComprobante(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    //   getCustomersList(): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/`);
    //   }

    //   getCustomersByAge(age: number): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/age/${age}/`);
    //   }

    //   deleteAll(): Observable<any> {
    //     return this.http.delete(`${this.baseUrl}/`);
    //   }
}