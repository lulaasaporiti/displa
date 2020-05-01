import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PrecioServicioClienteService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'PrecioServicioCliente';

    constructor(private http: HttpClient) { }

    getPreciosServiciosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetPreciosServicioCliente`);
    }

    // getServiciosVariosVigentesList(): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/GetServiciosVariosVigentes`);
    // }

    saveOrUpdatePrecioServicioCliente(precioServicioCliente: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, precioServicioCliente);
    }

    updatePrecioServicioCliente(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deletePrecioServicioCliente(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}