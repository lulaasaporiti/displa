import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TipoArticuloService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'TipoArticulo';

    constructor(private http: HttpClient) { }

    getTiposArticulosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposArticulo`);
    }
    
    getTiposArticulosVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTiposArticuloVigentes`);
    }

    saveOrUpdateTipoArticulo(tipoArticulo: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, tipoArticulo);
    }

    updateTipoArticulo(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteTipoArticulo(id: number): Observable<any> {
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