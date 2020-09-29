import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TipoServicioService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'TipoServicio';

    constructor(private http: HttpClient) { }

    getTiposServiciosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposServicio`);
    }
    
    getTiposServiciosVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposServicioVigentes`);
    }

    getTiposServicioConServiciosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposServicioConServicios`);
    }

    saveOrUpdateTipoServicio(tipoServicio: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, tipoServicio);
    }

    updateTipoServicio(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteTipoServicio(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}