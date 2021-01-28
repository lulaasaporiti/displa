import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReciboService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Recibo';

    constructor(private http: HttpClient) { }

    getRecibosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetRecibos`);
    }
    
    getReciboesVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetRecibosVigentes`);
    }
    
    saveOrUpdateRecibo(recibo: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, recibo);
    }

    updateRecibo(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteRecibo(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}