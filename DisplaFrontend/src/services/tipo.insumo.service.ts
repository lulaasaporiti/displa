import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TipoInsumoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'TipoInsumo';

    constructor(private http: HttpClient) { }

    getTiposInsumosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposInsumo`);
    }
    
    getTiposInsumosVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposInsumoVigentes`);
    }

    saveOrUpdateTipoInsumo(tipoInsumo: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, tipoInsumo);
    }

    updateTipoInsumo(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteTipoInsumo(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    //   getCustomersList(): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/`);
    //   }

    //   getCustomersByAge(age: number): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/age/${age}/`);
    //   }

    //   deleteAll(): Observable<any> {
    //     return this.http.delete(`${this.baseUrl}/`);
    //   }
}