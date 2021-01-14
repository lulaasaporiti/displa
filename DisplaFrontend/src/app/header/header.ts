import { Component} from '@angular/core';
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
import { ClienteSeleccionComponent } from '../factura/cliente-seleccion/cliente-seleccion.component';
import { LoadingSpinnerService } from '../loading-spinner/loading-spinner.service';
import { ModificacionParametrosComponent } from './modificacion-parametros/modificacion-parametros.component';
import { SobreAltaComponent } from '../sobre/sobre-alta/sobre-alta.component';
import { SobreService } from 'src/services/sobre.service';
import { ParametroService } from 'src/services/parametro.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  hide;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private mainService: MainService,
    private lenteService: LenteService,
    private sobreService: SobreService,
    private sessionService: SessionService,
    private accountService: AccountService,
    private servicioService: ServicioService,
    private parametroService: ParametroService,
    private articuloService: ArticuloVarioService,
    private loadingSpinnerService: LoadingSpinnerService,){
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


  
  isAuthenticated() {
    let isLogged = this.sessionService.isAuthenticated();
    let url = this.router.url.split('?')[0].toString();
    if (url != '/Account/Login' && url != '/') {
        if (isLogged == false) {
          this.router.navigateByUrl('/Account/Login');
        }
    }
    return isLogged;
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

  openDialogClientes(): void {
    let idCliente;
    const dialogRef = this.dialog.open(ClienteSeleccionComponent, {
      data: { idCliente: idCliente },
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.loadingSpinnerService.show();
        this.router.navigateByUrl('Account/Login').then(
          () => {
            this.router.navigateByUrl('Factura/Alta?id=' + result.idCliente);
            this.loadingSpinnerService.hide();
            window.scrollTo(0, 0);
          });
      }
    })
  }

  openDialogAltaSobre(): void {
    let idCliente;
    const dialogRef = this.dialog.open(SobreAltaComponent, {
      data: { idCliente: idCliente },
      width: '550px',
      height: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.loadingSpinnerService.show();
        this.sobreService.saveOrUpdateSobre(result).subscribe(
          data => {
            this.sessionService.showSuccess("Los sobres se han agregado correctamente.");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("Algún sobre no se agregó.");
          }
        );
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

  abrirModificacionParametros(){
    const dialogRef = this.dialog.open(ModificacionParametrosComponent, {
      data: { },
      width: '965px',
      height: '650px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.parametroService.saveOrUpdateParametro(result).subscribe(result => {
          console.log(result)
          if (result) {
            this.sessionService.showSuccess("Se guardaron los parámetros.");
          } else {
            this.sessionService.showError("No se pudieron guardar.");
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
            this.articuloService.generarPrecioLista(result)
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
            this.servicioService.generarPrecioLista(result)
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






