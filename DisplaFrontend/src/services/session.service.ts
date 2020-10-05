import { Injectable, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private tareasListSubject = new Subject<any>();
  titleString: string;
  Admin: boolean;
  SEPRIT: boolean;
  Campo: boolean;
  DirectorGeneral: boolean;
  Administracion: boolean;
  Coordinador: boolean;
  @Output() title: EventEmitter<any> = new EventEmitter();
  @Output() user: EventEmitter<any> = new EventEmitter();

  notifyObservable$ = this.tareasListSubject.asObservable();


  constructor(
    private toastr: ToastrService) {
  }

  removeToken() {
    localStorage.removeItem("token");
    this.Admin = false;
    this.Administracion = false;
    this.Campo = false;
    this.Coordinador = false;
    this.DirectorGeneral = false;
  }

  setTokenJWT(token: JSON) {
    localStorage.setItem('token', token['token']);
  }

  getPayload() {
    //En el payload voy a tener todos los claims que declare cuando genere el JWT
    //Ejemplo los roles :)
    return JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
  }

  getHeader() {
    return JSON.parse(atob(localStorage.getItem('token').split('.')[0]));
  }

  getToken() {
    return JSON.parse(atob(localStorage.getItem('token')));
  }

  getUserNameLoggedIn(): string {
    if (localStorage.getItem('token') != null) {
      let payload = this.getPayload();
      return payload["sub"];
    }
    return null;
  }

  setTitle(t: string) {
    localStorage.setItem('title', t);
    this.titleString = t;
    this.title.emit(t);
  }

  getTitle() {
    return this.title;
  }

  showSuccess(msg?: string) {
    msg = msg ? msg : 'Operación realizada con éxito.'
    // this.toastr.success(msg, 'Éxito');
  }

  showError(msg?: string) {
    msg = msg ? msg : 'Por favor intente nuevamente.'
    // this.toastr.error(msg, 'Error');
  }

  showWarning(msg?: string) {
    msg = msg ? msg : 'No tiene los permisos necesarios para esta operación.'
    this.toastr.warning(msg, '¡Cuidado!');
  }

  showInfo(msg?: string) {
    msg = msg ? msg : ''
    this.toastr.info(msg);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token') === null) {
      return false;
    }
    else {
      // Multiplico por mil la fecha en expire porque tiene menos precision que Date.now
      let payload: JSON = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      return (payload["exp"] * 1000 > Date.now())
    }
  }
  

  getUsername() {
    return this.user;
  }

  setUsername() {
    this.user.emit(this.getPayload()["sub"]);
  }

  setUserRol() {
    this.user.emit(this.getPayload()["roles"]);
  }

  setRol() {
    if (this.isAuthenticated()) {
      this.getPayload()["roles"].split('"').forEach((rol: string) => {
        switch (rol) {
          case "Admin":
            this.Admin = true;
            break;
          case "SEPRIT":
            this.SEPRIT = true;
            break;
          case "Campo":
            this.Campo = true;
            break;
          case "Director General":
            this.DirectorGeneral = true;
            break;
          case "Administracion":
            this.Administracion = true;
            break;
          case "Coordinador":
            this.Coordinador = true;
            break;
        }
      });
    }
  }

  isAdmin(){
    this.setRol();
    return this.Admin;
  }

  isAdministracion(){
    this.setRol();
    return this.Administracion;
  }

  isCampo(){
    this.setRol();
    return this.Campo;
  }

  isSEPRIT(){
    this.setRol();
    return this.SEPRIT;
  }

  isDirectorGeneral(){
    this.setRol();
    return this.DirectorGeneral;
  }

  isCoordinador(){
    this.setRol();
    return this.Coordinador;
  }
}