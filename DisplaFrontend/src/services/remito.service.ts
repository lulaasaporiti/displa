import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RemitoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Remito';

    constructor(private http: HttpClient) { }

    getRemitosClienteList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetRemitosCliente`);
    }
    
    getRemitosClienteVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetRemitosClienteVigentes`);
    }
    
    saveOrUpdateRemito(remito: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, remito);
    }

    updateRemito(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteRemito(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}