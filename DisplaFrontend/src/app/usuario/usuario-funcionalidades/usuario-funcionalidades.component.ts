import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { Funcion } from 'src/app/model/funcion';
import { AccountService } from 'src/services/account.service';
import { FuncionService } from 'src/services/funcion.service';

interface FuncionNode {
  expandable: boolean;
  funcion: Funcion;
  level: number;
}


@Component({
  selector: 'app-usuario-funcionalidades',
  templateUrl: './usuario-funcionalidades.component.html',
  styleUrls: ['./usuario-funcionalidades.component.css']
})


export class UsuarioFuncionesComponent {

  private _transformer = (node: Funcion, level: number) => {
    return {
      expandable: !!node.InverseIdFuncionPadreNavigation && node.InverseIdFuncionPadreNavigation.length > 0,
      funcion: node,
      level: level
    };
  }

  treeControl = new FlatTreeControl<FuncionNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.InverseIdFuncionPadreNavigation)
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  funcionesBBDD: Funcion[];
  // enabled = true;

  constructor(
    private funcionService: FuncionService,
    public dialogRef: MatDialogRef<UsuarioFuncionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.funcionService.getFuncionesAgrupadasList().subscribe(r => {
      this.dataSource.data = r
    });
    this.funcionService.getFuncionesList().subscribe(r => {
      this.funcionesBBDD = r;
    })
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onClicked(node: Funcion) {
    console.log(node, "nodo")
    // Si un padre tiene alguno de sus hijos chequeados, el padre tambien tiene que estarlo
    if (!this.data.funciones.some(f => f.Id === node.Id)) {
      this.data.funciones.push(node);
      if (node.IdFuncionPadre != undefined && !this.data.funciones.some(f => f.Id === node.IdFuncionPadre)) {
        let padre = this.funcionesBBDD.find(f => f.Id === node.IdFuncionPadre);
        this.data.funciones.push(padre);
        if (padre.IdFuncionPadre != undefined && !this.data.funciones.some(f => f.Id === padre.IdFuncionPadre)) {
          this.data.funciones.push(this.funcionesBBDD.find(f => f.Id === padre.IdFuncionPadre));
        }
      }
      if (node.InverseIdFuncionPadreNavigation != undefined) {
        node.InverseIdFuncionPadreNavigation.forEach(element => {
          this.onClicked(element)
        });
      }
    }
    else {
      this.data.funciones = this.data.funciones.filter(fs => fs.Id !== node.Id);
      if (node.InverseIdFuncionPadreNavigation != undefined) {
        node.InverseIdFuncionPadreNavigation.forEach(element => {
          this.onClicked(element)
        })
      }
    }
    console.log(this.data.funciones)
  }

  checkChecked(node: Funcion) {

    if (node != undefined) {
      if (this.data.funciones.some(f => f.Id === node.Id))
        return true
      else {
        return false
      }
    }
    else
      return false   
  }

  hasChild = (_: number, node: FuncionNode) => node.expandable;

}
