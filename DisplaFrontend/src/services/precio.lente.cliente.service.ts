import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PrecioLenteClienteService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'PrecioLenteCliente';

    constructor(private http: HttpClient) { }

    getPreciosLenteList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetPreciosLenteCliente`);
    }

    // getLentesVariosVigentesList(): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/GetLentesVariosVigentes`);
    // }

    saveOrUpdatePrecioLenteCliente(precioLenteCliente: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, precioLenteCliente);
    }

    updatePrecioLenteCliente(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deletePrecioLenteCliente(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}