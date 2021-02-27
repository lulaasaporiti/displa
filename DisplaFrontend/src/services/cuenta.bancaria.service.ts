import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})
export class CuentaBancariaService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'CuentaBancaria';

    constructor(private http: HttpClient, private mainService: MainService) { }

    getCuentaBancariasList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetCuentasBancarias`);
    }
    
    getNumero(numero: any, id: any, idBanco: any): Observable<any> {
        return this.mainService.get(`CuentaBancaria/GetNumero`, {
            numero: numero,
            id: id,
            idBanco: idBanco
        });
    }

    getCuentaBancariasVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetCuentasBancariasVigentes`);
    }
    
    saveOrUpdateCuentaBancaria(cuenta: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, cuenta);
    }

    updateCuentaBancaria(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteCuentaBancaria(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}