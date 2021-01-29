import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MovimientoInternoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'MovimientoInterno';

    constructor(private http: HttpClient) { }

    getMovimientoInternosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetMovimientoInternos`);
    }
    
    getMovimientoInternoesVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetMovimientoInternosVigentes`);
    }
    
    saveOrUpdateMovimientoInterno(recibo: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, recibo);
    }

    updateMovimientoInterno(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteMovimientoInterno(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}