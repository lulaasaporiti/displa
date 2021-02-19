import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChequeService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Cheque';

    constructor(private http: HttpClient) { }

    getChequesCartera(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetChequesCartera`);
    }
    
    saveOrUpdateCheque(cheque: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, cheque);
    }

    updateCheque(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteCheque(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}