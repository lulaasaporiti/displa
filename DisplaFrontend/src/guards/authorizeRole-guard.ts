import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthorizeRoleGuard implements CanActivate {

  constructor(
    public sessionService: SessionService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRoles = route.data.expectedRoles;
    const tokenPayload = this.sessionService.getPayload();
    let rolesFromUser: string[] = JSON.parse(tokenPayload["roles"]);
    let letMeIn: boolean = false;
    rolesFromUser.forEach(r => {
      //array.filter devuelve un array con los elementos que hubo match.
      //En caso de no haber match, devuelve un array vacio.
      if (expectedRoles.filter(x => x == r).length > 0) {
        letMeIn = true;
      }
    })
    if (!letMeIn) this.sessionService.showWarning()
    return letMeIn;
  }
}