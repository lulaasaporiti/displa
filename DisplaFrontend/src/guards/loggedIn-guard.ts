import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionService } from '../services/session.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private router: Router) {}

  canActivate() {
    let isLoggedIn:boolean = false;
    
    (this.sessionService.isAuthenticated()) ? isLoggedIn = true : this.router.navigateByUrl("Account/Login");
    
    return isLoggedIn
  }
}