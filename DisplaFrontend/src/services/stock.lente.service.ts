import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StockLenteService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'StockLente';

    constructor(private http: HttpClient) { }

    getStockLenteList(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    
    saveOrUpdateStockLente(ubicacion: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, ubicacion);
    }

    updateStockLente(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    getStockLente(medidaCilindrico: number, medidaEsferico: number, idLente: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${idLente}`);
    }

    deleteStockLente(medidaCilindrico: number, medidaEsferico: number, idLente: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${idLente}`);
    }
}
