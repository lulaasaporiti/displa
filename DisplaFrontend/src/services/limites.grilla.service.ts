import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LimitesGrillaService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'LimitesGrilla';

    constructor(private http: HttpClient) { }

    getLimitesGrillaList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetLimitesGrilla`);
    }
    
    saveOrUpdateLimitesGrilla(ubicacion: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, ubicacion);
    }

    updateLimitesGrilla(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    getByCombinacion(combinacion: string): Observable<any> {
        console.log(encodeURIComponent(combinacion));
        // return this.http.get(this.baseUrl+'/GetByCombinacion?combinacion=' + combinacion);
        return this.http.get(`${this.baseUrl}/GetByCombinacion?combinacion=${encodeURIComponent(combinacion)}`);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    deleteLimitesGrilla(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}

// '+ +'