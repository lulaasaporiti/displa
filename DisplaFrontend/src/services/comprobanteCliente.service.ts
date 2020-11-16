import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ComprobanteClienteService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'ComprobanteCliente';

    constructor(private http: HttpClient) { }

    getComprobantesClienteList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetComprobantesCliente`);
    }
    
    getComprobantesClienteVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetComprobantesClienteVigentes`);
    }
    
    saveOrUpdateComprobanteCliente(comprobantecliente: Object): Observable<object> {
        console.log("entro")
        return this.http.post(`${this.baseUrl}/`, comprobantecliente);
    }

    updateComprobanteCliente(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteComprobanteCliente(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}