import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ArticuloVarioService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'ArticuloVario';

    constructor(private http: HttpClient) { }

    getArticulosVariosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetArticulosVarios`);
    }

    getArticulosVariosVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetArticulosVariosVigentes`);
    }
    
    getArticulosVariosClientes(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetArticulosVariosClientes`);
    }

    saveOrUpdateArticuloVario(articuloVario: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, articuloVario);
    }

    updateArticuloVario(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteArticuloVario(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}