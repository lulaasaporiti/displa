import { Component} from '@angular/core';
import { Router } from '@angular/router';
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
import { ReciboAltaComponent } from '../recibo/recibo-alta/recibo-alta.component';
import { ReciboService } from 'src/services/recibo.service';
import { MovimientoInternoAltaComponent } from '../movimiento-interno/movimiento-interno-alta/movimiento-interno-alta.component';
import { MovimientoInternoService } from 'src/services/movimiento.interno.service';
import { VentaClienteMesComponent } from '../estadistica/venta-cliente-mes/venta-cliente-mes.component';
import { MatDialog } from '@angular/material/dialog';
import { BusquedaItemComprobanteComponent } from '../busqueda-item/busqueda-item-facturado/busqueda-item-comprobante.component';
import { MovimientoInternoBancoAltaComponent } from '../banco/movimiento-interno-banco-alta/movimiento-interno-banco-alta.component';
import { TrasladoFondoComponent } from '../banco/traslado-fondo/traslado-fondo.component';
import { OperacionCuentaBancariaComponent } from '../banco/operacion-bancaria/operacion-bancaria.component';
import { DejoComprarComponent } from '../estadistica/dejo-comprar/dejo-comprar.component';
import { CristalesVendidosComponent } from '../estadistica/cristales-vendidos/cristales-vendidos.component';
import { OperacionBancariaService } from 'src/services/operacion.bancaria.service';
import { TrasladoFondoService } from 'src/services/traslado.fondo..service';
import { MovimientoCajaAltaComponent } from '../caja/movimiento-caja-alta/movimiento-caja-alta.component';
import { MovimientoCajaDiariaAltaComponent } from '../caja/movimiento-caja-diaria-alta/movimiento-caja-diaria-alta.component';
import { PuestaEnCeroComponent } from '../lente/puesta-en-cero/puesta-en-cero.component';
import { PorcentajeDescuentosComponent } from '../cliente/porcentaje-descuentos/porcentaje-descuentos.component';

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
    private reciboService: ReciboService,
    private sessionService: SessionService,
    private accountService: AccountService,
    private servicioService: ServicioService,
    private parametroService: ParametroService,
    private articuloService: ArticuloVarioService,
    private trasladoFondoService: TrasladoFondoService,
    private loadingSpinnerService: LoadingSpinnerService,
    private movimientoInternoService: MovimientoInternoService,
    private operacionBancariaService: OperacionBancariaService,
    ){
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

  ngOnInit() {
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
        this.router.navigateByUrl('Account/Login').then(
          () => {
            this.router.navigateByUrl('Lente/Stock?id=' + result.idLente);
            this.loadingSpinnerService.hide();
            window.scrollTo(0, 0);
          });
      }
    })
  }

  openDialogPuesta(): void {
    let idLente;
    const dialogRef = this.dialog.open(PuestaEnCeroComponent, {
      data: { idLente: idLente },
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.router.navigateByUrl('Account/Login').then(
          () => {
            this.router.navigateByUrl('Lente/Stock?id=' + result.idLente);
            this.loadingSpinnerService.hide();
            window.scrollTo(0, 0);
          });
      }
    })
  }

  openDialogPorcentajeDescuentos() {
    const dialogRef = this.dialog.open(PorcentajeDescuentosComponent, {
      width: '600px'
    })
  }

  openDialogBusquedaItem(): void {
    let idCliente;
    const dialogRef = this.dialog.open(BusquedaItemComprobanteComponent, {
      data: { idCliente: idCliente },
      width: '600px'
    })
  }

  openDialogTrasladoFondos(): void {
    const dialogRef = this.dialog.open(TrasladoFondoComponent, {
      data: { },
      width: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.loadingSpinnerService.show();
        this.trasladoFondoService.saveOrUpdateTrasladoFondo(result).subscribe(
          data => {
            if (data != null)
              this.sessionService.showSuccess("El traslado se realizó correctamente.");
            else 
              this.sessionService.showError("El traslado no se realizó.");
          },
          error => {
            this.sessionService.showError("El traslado no se realizó.");
          }
        );
        this.loadingSpinnerService.hide();
      }
    })
  }

  openDialogoOperacionesCuentas(): void {
    const dialogRef = this.dialog.open(OperacionCuentaBancariaComponent, {
      data: { },
      width: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.loadingSpinnerService.show();
        this.operacionBancariaService.saveOrUpdateOperacionBancaria(result).subscribe(
          data => {
            if (data != null)
              this.sessionService.showSuccess("La operación se agregó correctamente.");
            else 
              this.sessionService.showError("La operación no se agregó.");
          },
          error => {
            this.sessionService.showError("La operación no se agregó.");
          }
        );
      }
    })
  }


  openDialogAltaRecibo(): void {
    const dialogRef = this.dialog.open(ReciboAltaComponent, {
      data: {  },
      width: '650px',
      height: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.loadingSpinnerService.show();
        this.reciboService.saveOrUpdateRecibo(result).subscribe(
          data => {
            this.sessionService.showSuccess("El recibo se agregó correctamente.");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El recibo no se agregó.");
          }
        );
      }
    })
  }

  openDialogAltaMovimientoInterno(tipo): void {
    const dialogRef = this.dialog.open(MovimientoInternoAltaComponent, {
      data: { tipo: tipo },
      width: '650px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.loadingSpinnerService.show();
        this.movimientoInternoService.saveOrUpdateMovimientoInterno(result).subscribe(
          data => {
            this.sessionService.showSuccess("El movimiento interno se agregó correctamente.");
            this.loadingSpinnerService.hide();
          },
          error => {
            this.sessionService.showError("El movimiento interno no se agregó.");
            this.loadingSpinnerService.hide();
          }
        );
      }
    })
  }

  openDialogAltaMovimientoInternoBanco(): void {
    const dialogRef = this.dialog.open(MovimientoInternoBancoAltaComponent, {
      data: { },
      width: '650px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.loadingSpinnerService.show();
        this.operacionBancariaService.saveOrUpdateOperacionBancaria(result).subscribe(
          data => {
            if (data != null)
              this.sessionService.showSuccess("La operación se agregó correctamente.");
            else 
              this.sessionService.showError("La operación no se agregó.");
          },
          error => {
            this.sessionService.showError("La operación no se agregó.");
          }
        );
      }
    })
  }

  openDialogAltaMovimientoCaja(): void {
    const dialogRef = this.dialog.open(MovimientoCajaAltaComponent, {
      data: { },
      width: '650px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        // this.loadingSpinnerService.show();
        // this.operacionBancariaService.saveOrUpdateOperacionBancaria(result).subscribe(
        //   data => {
        //     if (data != null)
        //       this.sessionService.showSuccess("La operación se agregó correctamente.");
        //     else 
        //       this.sessionService.showError("La operación no se agregó.");
        //   },
        //   error => {
        //     this.sessionService.showError("La operación no se agregó.");
        //   }
        // );
      }
    })
  }

  openDialogAltaMovimientoCajaDiaria(): void {
    const dialogRef = this.dialog.open(MovimientoCajaDiariaAltaComponent, {
      data: { },
      width: '650px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        // this.loadingSpinnerService.show();
        // this.operacionBancariaService.saveOrUpdateOperacionBancaria(result).subscribe(
        //   data => {
        //     if (data != null)
        //       this.sessionService.showSuccess("La operación se agregó correctamente.");
        //     else 
        //       this.sessionService.showError("La operación no se agregó.");
        //   },
        //   error => {
        //     this.sessionService.showError("La operación no se agregó.");
        //   }
        // );
      }
    })
  }

  openDialogVentaClienteMes(): void {
    const dialogRef = this.dialog.open(VentaClienteMesComponent, {
      data: {  },
      width: '750px'
    })
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != undefined && result != false) {
    //     this.loadingSpinnerService.show();
    //     this.movimientoInternoService.saveOrUpdateMovimientoInterno(result).subscribe(
    //       data => {
    //         this.sessionService.showSuccess("El movimiento interno se agregó correctamente.");
    //       },
    //       error => {
    //         this.sessionService.showError("El movimiento interno no se agregó.");
    //       }
    //     );
    //   }
    // })
  }


  openDialogDejoDeComprar(): void {
    const dialogRef = this.dialog.open(DejoComprarComponent, {
      data: {  },
      width: '650px'
    })
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != undefined && result != false) {
    //     this.loadingSpinnerService.show();
    //     this.movimientoInternoService.saveOrUpdateMovimientoInterno(result).subscribe(
    //       data => {
    //         this.sessionService.showSuccess("El movimiento interno se agregó correctamente.");
    //       },
    //       error => {
    //         this.sessionService.showError("El movimiento interno no se agregó.");
    //       }
    //     );
    //   }
    // })
  }

  openDialogCristalesVendidos(): void {
    const dialogRef = this.dialog.open(CristalesVendidosComponent, {
      data: {  },
      height: '500px',
      width: '650px'
    })
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != undefined && result != false) {
    //     this.loadingSpinnerService.show();
    //     this.movimientoInternoService.saveOrUpdateMovimientoInterno(result).subscribe(
    //       data => {
    //         this.sessionService.showSuccess("El movimiento interno se agregó correctamente.");
    //       },
    //       error => {
    //         this.sessionService.showError("El movimiento interno no se agregó.");
    //       }
    //     );
    //   }
    // })
  }

  openDialogClientes(event): void {
    let idCliente;
    const dialogRef = this.dialog.open(ClienteSeleccionComponent, {
      data: { idCliente: idCliente },
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        if (event == 'factura') {
          this.loadingSpinnerService.show();
          this.router.navigateByUrl('Account/Login').then(
            () => {
              this.router.navigateByUrl('Factura/Alta?id=' + result.idCliente);
              this.loadingSpinnerService.hide();
              window.scrollTo(0, 0);
            });
        }
        if (event == 'credito') {
          this.loadingSpinnerService.show();
          this.router.navigateByUrl('Account/Login').then(
            () => {
              this.router.navigateByUrl('NotaCredito/Alta?id=' + result.idCliente);
              this.loadingSpinnerService.hide();
              window.scrollTo(0, 0);
            });
        }
        if (event == 'debito') {
          this.loadingSpinnerService.show();
          this.router.navigateByUrl('Account/Login').then(
            () => {
              this.router.navigateByUrl('NotaDebito/Alta?id=' + result.idCliente);
              this.loadingSpinnerService.hide();
              window.scrollTo(0, 0);
            });
        }
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
    })
  }

  chequearFuncionUsuario(idFuncion){
    return this.sessionService.chequearFuncion(idFuncion);
  }
}






