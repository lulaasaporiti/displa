import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { combineLatest } from 'rxjs';
import { Funcion } from 'src/app/model/funcion';
import { AccountService } from 'src/services/account.service';
import { FuncionService } from 'src/services/funcion.service';


@Component({
  selector: 'app-usuario-funcionalidades',
  templateUrl: './usuario-funcionalidades.component.html',
  styleUrls: ['./usuario-funcionalidades.component.css']
})
export class UsuarioFuncionesComponent {
  treeControl = new NestedTreeControl<Funcion>(node => node.InverseIdFuncionPadreNavigation);
  dataSource = new MatTreeNestedDataSource<Funcion>();
  funcionesSeleccionadas: Funcion[] = [];

  constructor(
    private accountService: AccountService,
    private funcionService: FuncionService,
    public dialogRef: MatDialogRef<UsuarioFuncionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      combineLatest([
        this.funcionService.getFuncionesAgrupadasList(),
        this.accountService.getFuncionesUsuario(data.modelUsuario.Id)
      ])  
      .subscribe(r => {
        console.log(r[1])
        this.dataSource.data = r[0];
      });
    }

    onNoClick(): void {        
        this.dialogRef.close(false);
    }

    onClicked(node: Funcion){
      console.log(node)
      console.log(this.funcionesSeleccionadas.includes(node))
      if (!this.funcionesSeleccionadas.includes(node)) {
        this.funcionesSeleccionadas.push(node);
        this.funcionesSeleccionadas = this.funcionesSeleccionadas.concat(node.InverseIdFuncionPadreNavigation)
      }

      console.log(this.funcionesSeleccionadas)
    }

  hasChild = (_: number, node: Funcion) => !!node.InverseIdFuncionPadreNavigation && node.InverseIdFuncionPadreNavigation.length > 0;

}
