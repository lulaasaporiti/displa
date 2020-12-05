import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SobreService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Sobre';

    constructor(private http: HttpClient) { }

    getSobresList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetSobres`);
    }
    
    saveOrUpdateSobre(sobre: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, sobre);
    }

    updateSobre(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteSobre(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}