import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TipoDescuentoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'TipoDescuento';

    constructor(private http: HttpClient) { }

    getTiposDescuentosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposDescuento`);
    }
    
    getTiposDescuentosVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposDescuentoVigentes`);
    }

    saveOrUpdateTipoDescuento(tipoDescuento: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, tipoDescuento);
    }

    updateTipoDescuento(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteTipoDescuento(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}