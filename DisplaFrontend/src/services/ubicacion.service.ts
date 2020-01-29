import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UbicacionService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Ubicacion';

    constructor(private http: HttpClient) { }

    getUbicacionesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetUbicaciones`);
    }
    
    getUbicacionesVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetUbicacionesVigentes`);
    }
    
    saveOrUpdateUbicacion(ubicacion: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, ubicacion);
    }

    updateUbicacion(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteUbicacion(id: number): Observable<any> {
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