import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ComprobanteProveedorService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'ComprobanteProveedor';

    constructor(private http: HttpClient) { }

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
}