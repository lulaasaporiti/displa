import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GastoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Gasto';

    constructor(private http: HttpClient) { }

    getGastosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetGastos`);
    }
    
    saveOrUpdateGasto(gasto: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, gasto);
    }

    updateGasto(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteGasto(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}