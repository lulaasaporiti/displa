import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})
export class RemitoService {

    private baseUrl = environment.BASE_USER_ENDPOINT + 'Remito';

    constructor(private http: HttpClient, private mainService: MainService) { }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    
    getRemitosPendientesCliente(idCliente: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetRemitosPendientesCliente?idCliente=${idCliente}`);
    }
    
    getRemitosClienteVigentesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetRemitosClienteVigentes`);
    }
    
    saveOrUpdateRemito(remito: Object): Observable<object> {
        return this.http.post(`${this.baseUrl}/`, remito);
    }

    updateRemito(id: number, value: any): Observable<object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteRemito(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getNumeroRemito(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetLastCode`);
    }

    buscarItemRemito(idLente, idArticulo, libre, desde, hasta){
        return this.mainService.get(`Remito/BuscarItemRemito`, {
            idLente: idLente,
            idArticulo: idArticulo,
            libre: libre,
            desde: desde,
            hasta: hasta
        });
    }

    buscarRemito(idCliente, desde, hasta){
        return this.mainService.get(`Remito/BuscarRemito`, {
            idCliente: idCliente,
            fechaDesde: desde,
            fechaHasta: hasta
        });
    }

    buscarRemitoPorNumero(numeroRemito){
        return this.mainService.get(`Remito/BuscarRemitoPorNumero`, {
            numeroRemito: numeroRemito,
        });
    }

    buscarRemitosAnulados(desde, hasta){
        return this.mainService.get(`Remito/BuscarRemitosAnulados`, {
            fechaDesde: desde,
            fechaHasta: hasta
        });
    }
}