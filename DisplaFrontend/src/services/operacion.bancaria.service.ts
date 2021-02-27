import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperacionBancariaService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'OperacionBancaria';

    constructor(private http: HttpClient) { }

    getOperacionBancaria(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetOperacionBancaria`);
    }

    getOperacionesBancariasList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetOperacionesBancarias`);
    }
    
    getObservaciones(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetObservaciones()`);
    }
    
    saveOrUpdateOperacionBancaria(parametro: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, parametro);
    }

    updateOperacionBancaria(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteOperacionBancaria(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}