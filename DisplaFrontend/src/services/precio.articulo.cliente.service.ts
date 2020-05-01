import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PrecioArticuloClienteService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'PrecioArticuloCliente';

    constructor(private http: HttpClient) { }

    getArticulosVariosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetPreciosArticuloCliente`);
    }

    // getArticulosVariosVigentesList(): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/GetArticulosVariosVigentes`);
    // }

    saveOrUpdatePrecioArticuloCliente(precioArticuloCliente: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, precioArticuloCliente);
    }

    updatePrecioArticuloCliente(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deletePrecioArticuloCliente(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}