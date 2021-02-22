import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CuentaBancariaService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'CuentaBancaria';

    constructor(private http: HttpClient) { }

    getCuentaBancariasList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetCuentasBancarias`);
    }
    
    getNumero(value: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetNumero`, value);
    }

    getCuentaBancariasVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetCuentasBancariasVigentes`);
    }
    
    saveOrUpdateCuentaBancaria(recibo: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, recibo);
    }

    updateCuentaBancaria(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteCuentaBancaria(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}