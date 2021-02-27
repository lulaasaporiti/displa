import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})
export class TrasladoFondoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'TrasladoFondo';

    constructor(private http: HttpClient, private mainService: MainService) { }

    getTrasladoFondosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTrasladosFondos`);
    }


    getTrasladoFondosVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetTrasladosFondosVigentes`);
    }
    
    saveOrUpdateTrasladoFondo(traslado: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, traslado);
    }

    updateTrasladoFondo(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteTrasladoFondo(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}