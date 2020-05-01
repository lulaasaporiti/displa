import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriaIVAService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'CategoriaIVA';

    constructor(private http: HttpClient) { }

    getCategoriaIVAList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetCategoriasIVA`);
    }
    
    getCategoriaIVAVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetCategoriasIVAVigentes`);
    }
    
    saveOrUpdateCategoriaIVA(categoriaIVA: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, categoriaIVA);
    }

    updateCategoriaIVA(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteCategoriaIVA(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}