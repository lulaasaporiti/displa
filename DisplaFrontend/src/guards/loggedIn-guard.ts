import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionService } from '../services/session.service';
import { MatDialog } from '@angular/material';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private dialog: MatDialog,
    private router: Router) {}

  canActivate() {
    let isLoggedIn:boolean = false;
    (this.sessionService.isAuthenticated()) ? isLoggedIn = true : this.router.navigateByUrl("Account/Login");
    if (!isLoggedIn) this.sessionService.showWarning("Debe iniciar sesión para acceder al link."); {
      this.dialog.closeAll();
      return isLoggedIn
    }

  }
}