import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TarjetaCreditoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'TarjetaCredito';

    constructor(private http: HttpClient) { }

    getTarjetasCreditoList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTarjetasCredito`);
    }
    
    getTarjetasCreditoVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTarjetasCreditoVigentes`);
    }
    
    saveOrUpdateTarjetaCredito(tarjeta: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, tarjeta);
    }

    updateTarjetaCredito(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteTarjetaCredito(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}