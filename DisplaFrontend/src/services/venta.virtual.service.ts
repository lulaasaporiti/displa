import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})
export class VentaVirtualService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'VentaVirtual';

    constructor(private http: HttpClient,  private mainService: MainService) { }

    getVentasVirtualesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetVentasVirtuales`);
    }

    getEntregasPendientes(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetEntregasPendientes`);
    }
    
    saveOrUpdateVentaVirtual(ventaVirtual: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, ventaVirtual);
    }

    updateVentaVirtual(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteVentaVirtual(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getVentasVirtualesCliente(idCliente: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetVentasVirtualesCliente?idCliente=${idCliente}`);
    }

    saveOrUpdateVentaVirtualMovimiento(movimientoVentaVirtual: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/VentaVirtualMovimiento`, movimientoVentaVirtual);
    }

    getLentesConVentaVirtual(idCliente, idLente): Observable<any> {
        return this.mainService.get(`VentaVirtual/GetLentesConVentaVirtual`, {    
        idCliente: idCliente,
        idLente: idLente
        });
    }

    getArticulosConVentaVirtual(idCliente, idArticulo): Observable<any> {
        return this.mainService.get(`VentaVirtual/GetArticulosConVentaVirtual`, {    
        idCliente: idCliente,
        idArticulo: idArticulo
        });
    }

    getMovimientos(idVenta: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetMovimientos?idVenta=${idVenta}`);
    }
}