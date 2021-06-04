
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from './main.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { LoginView } from "../app/model/loginView";
import { ResetPasswordView } from "../app/model/resetPasswordView";
import { ChangePasswordView } from "../app/model/changePasswordView";
import { RegisterView } from '../app/model/registerView';
import { Usuario, EditUsuarioDTO } from '../app/model/usuario';
import { environment } from 'src/environments/environment';
import { Funcion } from 'src/app/model/funcion';


@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private apiUrl = "Account/";

    constructor(private mainService: MainService, private http: HttpClient) { }

    login(model: LoginView): Observable<any> {
        return this.mainService.post(this.apiUrl + "Login", model);
    }

    register(model: RegisterView): Observable<any> {
        return this.mainService.post(this.apiUrl + "Register", model);
    }

    getRolesList(): Observable<any> {
        return this.mainService.get(this.apiUrl + "GetRoles", new HttpParams());
    }

    getUsersList(): Observable<any> {
        return this.mainService.get(this.apiUrl + "GetUsuarios", new HttpParams());
    }

    getUsersActivosList(): Observable<any> {
        return this.mainService.get(this.apiUrl + "GetUsuariosActivos", new HttpParams());
    }
    
    forgotPassword(model: string): Observable<any> {
        //console.log(model);
        return this.mainService.get(this.apiUrl + "ForgotPassword", new HttpParams().set('model', model));
    }

    resetPassword(model: ResetPasswordView): Observable<any> {
        //console.log(model);
        model.Code = decodeURIComponent(model.Code);
        return this.mainService.post(this.apiUrl + "ResetPassword", model);
    }

    changePassword(model: ChangePasswordView): Observable<any> {
        let body = JSON.stringify(model);
        return this.mainService.post(this.apiUrl + "ChangePassword", body);
    } 

    edit(model: EditUsuarioDTO): Observable<any>{
        // console.log(model)
        return this.mainService.put(this.apiUrl+"Edit", model);
    }
    
    getUserById(data) {
        return this.mainService.get(this.apiUrl+'Get?id='+data, new HttpParams());
    }

    activated(data): Observable<any> {
        return this.mainService.delete(this.apiUrl+'Activated?id='+data);
    }

    delete(data): Observable<any> {
        return this.mainService.delete(this.apiUrl+'Delete?id='+data);
    }

    getFuncionesUsuario(idUsuario) {
        return this.http.get(environment.BASE_USER_ENDPOINT + this.apiUrl+'GetFuncionesUsuario/'+idUsuario);
    }

    saveFuncion(model: Funcion, id: number): Observable<any> {
        return this.http.put(environment.BASE_USER_ENDPOINT + this.apiUrl+'SaveFuncion/' + id, model);
    }
    
}