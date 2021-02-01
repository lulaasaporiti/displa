import { Component, OnInit, ViewChild, Output, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSlideToggleModule } from '@angular/material/core';
import { UsuarioAltaComponent } from '../usuario-alta/usuario-alta.component';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { UsuarioBajaComponent } from '../usuario-baja/usuario-baja.component';
import { UsuarioModificacionComponent } from '../usuario-modificacion/usuario-modificacion.component';
import { Usuario } from 'src/app/model/usuario';
import { AccountModule } from 'src/app/account/account.module';
import { AccountService } from 'src/services/account.service';
import { RegisterView } from 'src/app/model/registerView';
import { SessionService } from 'src/services/session.service';
import { ChangePasswordComponent } from 'src/app/account/change-password/change-password.component';



@Component({
  selector: 'app-usuario-listado',
  templateUrl: './usuario-listado.component.html',
  styleUrls: ['./usuario-listado.component.css']
})

export class UsuarioListadoComponent implements OnInit {

  idUser: number;
  displayedColumns: string[] = ['Activo', 'Username', 'Nombre', 'Apellido', 'Roles', 'Opciones'];
  dataSource = new MatTableDataSource<Usuario>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private accountService: AccountService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadUsuarioPage();
    this.idUser = +this.sessionService.getPayload()['idUser']
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadUsuarioPage();
  }

  loadUsuarioPage() {
    // console.log("entro")
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.accountService.getUsersActivosList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
      this.accountService.getUsersList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    }
    
  }

  openDialogEditUserPass() {
    let dialogRefUser = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      data: { user: this.sessionService.getPayload()["sub"] }
    });
    dialogRefUser.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
      } 
    });
  }

  agregarUsuario(): void {
    let usuario = <RegisterView>{};
    usuario.Email = "";
    const dialogRef = this.dialog.open(UsuarioAltaComponent, {
      width: '550px',
      data: { modelUsuario: usuario, usuarios: this.dataSource.data }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.accountService.register(usuario).subscribe(
          data => {
            this.loadUsuarioPage()
            this.sessionService.showSuccess("El usuario se ha agregado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El usuario no se agregó.");
          }
        );
      }
    }
    );
  }



  // activarUsuario = function (event: AuthUser) {
  //   let dialogRef = this.dialog.open(UsuarioBajaComponent, {
  //     data: { Id: event }
  //   });
  // }

  activarUsuario(event: any) {
    let dialogRef = this.dialog.open(UsuarioBajaComponent, {
      data: { modelUsuario: event }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result != false && result != undefined) {
        this.accountService.activated(event.Id).subscribe(x => {
          if (x == true) {
            this.sessionService.showSuccess("La operación se ha realizado correctamente");
            this.loadUsuarioPage();
          }
          else
            this.sessionService.showError("La operación no se realizó");
        })
      }
      this.loadUsuarioPage();
    });
  }

  modificarUsuario(event: any) {
    let usuarioViejo = JSON.parse(JSON.stringify(event));
    event = usuarioViejo;
    const dialogRef = this.dialog.open(UsuarioModificacionComponent, {
      width: '550px',
      data: { modelUsuario: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        console.log(event)
        this.accountService.edit(event).subscribe(
          data => {
            this.loadUsuarioPage()
            this.sessionService.showSuccess("El usuario se ha modificado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El usuario no se modificó.");
          }
        );
      }
    });
  }

}


