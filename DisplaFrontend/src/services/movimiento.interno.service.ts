import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})
export class MovimientoInternoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'MovimientoInterno';

    constructor(private http: HttpClient, private mainService: MainService) { }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    getMovimientoInternosList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetMovimientoInternos`);
    }
    
    getMovimientoInternoesVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetMovimientoInternosVigentes`);
    }
    
    saveOrUpdateMovimientoInterno(recibo: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, recibo);
    }

    updateMovimientoInterno(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteMovimientoInterno(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getBusquedaMovimiento(idCliente, fechaDesde, fechaHasta): Observable<any> {
        return this.mainService.get(`MovimientoInterno/BuscarMovimiento`, {
            idCliente: idCliente,
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta
        });
    }

    getBusquedaMovimientoProveedor(idProveedor, fechaDesde, fechaHasta): Observable<any> {
        return this.mainService.get(`MovimientoInterno/BuscarMovimientoProveedor`, {
            idProveedor: idProveedor,
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta
        });
    }
}