import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AccountUsernameComponent } from '../account-username/account-username.component';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { LoginView } from 'src/app/model/loginView';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {

  usuario = <LoginView>{};
  hidePassword = true;


  constructor(public dialog: MatDialog, 
    private accountService: AccountService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService,
    private router: Router) { }

    ngOnInit() {
      console.log(this.sessionService.isAuthenticated())
      if (this.sessionService.isAuthenticated()) {
        this.router.navigateByUrl('/Home');
      }
    }

  login() {
    this.accountService.login(this.usuario).subscribe(
      result => {
        this.sessionService.setTokenJWT(result);
        this.sessionService.setUsername();
     },
      error => this.sessionService.showError("Usuario y/o contraseña incorrecta."),
      () => {
        if (this.sessionService.getPayload()["activo"] == "False") {
          this.sessionService.removeToken();
          this.sessionService.showError("No tiene permisos para iniciar sesión.");
        } else {
          this.loadingSpinnerService.show()
          this.sessionService.showSuccess("Ha iniciado sesión correctamente")
          this.router.navigateByUrl('/Home');
          this.loadingSpinnerService.hide();
        }
       }
    );
  }


  forgotPassword() {
    let dialogRef = this.dialog.open(AccountUsernameComponent, {
      //height: '400px',
      width: '300px',
      data: {}
    });
  }

}
