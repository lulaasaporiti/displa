import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ParametroService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Parametro';

    constructor(private http: HttpClient) { }

    getParametro(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetParametro`);
    }
    
    getObservaciones(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetObservaciones()`);
    }
    
    saveOrUpdateParametro(parametro: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, parametro);
    }

    updateParametro(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteParametro(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}