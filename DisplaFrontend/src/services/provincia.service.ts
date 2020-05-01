import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProvinciaService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Provincia';

    constructor(private http: HttpClient) { }

    getProvinciasList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetProvincias`);
    }
    
    getProvinciasVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetProvinciasVigentes`);
    }
    
    saveOrUpdateProvincia(provincia: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, provincia);
    }

    updateProvincia(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteProvincia(id: number): Observable<any> {
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