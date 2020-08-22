import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SessionService } from 'src/services/session.service';
import { AccountService } from 'src/services/account.service';
import { MainService } from 'src/services/main.service';
import { AccountUsernameComponent } from '../account/account-username/account-username.component';
import { LenteSeleccionComponent } from '../lente/lente-seleccion/lente-seleccion.component';
import { PrecioListaUnoComponent } from './gestion-precio/precio-lista-uno/precio-lista-uno.component';
import { ServicioService } from 'src/services/servicio.service';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { LenteService } from 'src/services/lente.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  hide;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private accountService: AccountService,
    private mainService: MainService,
    private lenteService: LenteService,
    private articuloService: ArticuloVarioService,
    private servicioService: ServicioService,
    private sessionService: SessionService) {
  }

  logout() {
    this.mainService.post("Account/Logout", null).subscribe(
      () => {
        this.sessionService.setTitle("Displa");
        this.sessionService.removeToken();
        this.sessionService.showSuccess("Ha cerrado sesión correctamente.")
        this.router.navigateByUrl('/Account/Login');
      }
    );
  }

  openDialogLentes(): void {
    let idLente;
    const dialogRef = this.dialog.open(LenteSeleccionComponent, {
      data: { idLente: idLente },
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.router.navigateByUrl('Lente/Stock?id=' + result.idLente);
      }
    })
  }

  forgotPassword() {
    let dialogRef = this.dialog.open(AccountUsernameComponent, {
      //height: '400px',
      width: '300px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.accountService.forgotPassword(result).subscribe(result => {
          if (result) {

            // "http://10.32.3.68/Liquidaciones/Account/ResetPassword?code=" + encodeURIComponent(result.code);
            // this.mail.body = this.mail.body + "localhost:4200/Account/ResetPassword?code=" + encodeURIComponent(result.code);

          } else {
            this.sessionService.showError("Usuario incorrecto.");
          }
        });
      }
    });
  }

  openModalPreciosLista(event): void {
    var porcentaje;
    var lista;
    const dialogRef = this.dialog.open(PrecioListaUnoComponent, {
      data: { producto: event, Porcentaje: porcentaje, Lista: lista },
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result.Porcentaje != undefined && result.Lista != undefined && result != false) {
        switch (result.producto) {
          case 'lente': {
            console.log(result.producto)
            this.lenteService.generarPrecioLista(result)
            .subscribe(
              data => {
                this.sessionService.showSuccess("La lista se ha generado correctamente");
              },
              error => {
                // console.log(error)
                this.sessionService.showError("La lista no se agregó.");
              }
            )
            break;
          }
          case 'articulo': {
            this.articuloService.generarPrecioLista(result.Porcentaje, result.Lista)
            .subscribe(
                data => {
                  this.sessionService.showSuccess("La lista se ha generado correctamente");
                },
                error => {
                  // console.log(error)
                  this.sessionService.showError("La lista no se agregó.");
                }
              )
            break;
          }
          case 'servicio': {
            this.servicioService.generarPrecioLista(result.Porcentaje, result.Lista)
            .subscribe(
              data => {
                this.sessionService.showSuccess("La lista se ha generado correctamente");
              },
              error => {
                // console.log(error)
                this.sessionService.showError("La lista no se agregó.");
              }
            )
            break;
          }
          default: {
            //statements; 
            break;
          }
        }
      }
      // else {

      // }
    })
  }
}






