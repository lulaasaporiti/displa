import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BancoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Banco';

    constructor(private http: HttpClient) { }

    getBancosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetBancos`);
    }
    
    getBancosVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetBancosVigentes`);
    }
    
    saveOrUpdateBanco(banco: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, banco);
    }

    updateBanco(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteBanco(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}