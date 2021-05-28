import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})
export class MovimientoBlockService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'MovimientoBlock';

    constructor(private http: HttpClient, private mainService: MainService) { }

    getMovimientoBlockList(id): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetMovimientosBlock?id=${id}`);

    }
    
    saveOrUpdateMovimientoBlock(movimientoBlock: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, movimientoBlock);
    }

    updateMovimientoBlock(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteMovimientoBlock(id: number): Observable<any> {
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