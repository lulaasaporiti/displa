import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProveedorService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Proveedor';

    constructor(private http: HttpClient) { }

    getProveedoresList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetProveedores`);
    }
    
    getProveedoresVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetProveedoresVigentes`);
    }
    
    saveOrUpdateProveedor(proveedor: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, proveedor);
    }

    updateProveedor(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteProveedor(id: number): Observable<any> {
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