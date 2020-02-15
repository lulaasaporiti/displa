import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Cliente';

    constructor(private http: HttpClient) { }

    getClientesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetClientes`);
    }
    
    getClientesVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetClientesVigentes`);
    }
    
    saveOrUpdateCliente(ubicacion: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, ubicacion);
    }

    updateCliente(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteCliente(id: number): Observable<any> {
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