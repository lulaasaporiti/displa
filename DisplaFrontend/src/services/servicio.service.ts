import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServicioService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Servicio';

    constructor(private http: HttpClient) { }

    getServiciosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetServicios`);
    }

    getServiciosVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetServiciosVigentes`);
    }

    saveOrUpdateServicio(servicio: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, servicio);
    }

    updateServicio(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteServicio(id: number): Observable<any> {
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