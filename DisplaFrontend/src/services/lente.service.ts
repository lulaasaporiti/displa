import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LenteService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Lente';

    constructor(private http: HttpClient) { }

    getLentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetLentes`);
    }

    getLentesVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetLentesVigentes`);
    }

    getLentesVigentesAgrupadosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetLentesVigentesAgrupados`);
    }

    getCombinaciones(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetCombinaciones`);
    }

    getCodigoLente(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetLastCode`);
    }

    saveOrUpdateLente(lente: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, lente);
    }

    saveActualizacionPrecio(porcentajesLentes: Object[]):  Observable<object> {
        return this.http.put(`${this.baseUrl}/`, porcentajesLentes);
    }


    updateLente(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteLente(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
}