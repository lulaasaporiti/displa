import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Funcion } from 'src/app/model/funcion';
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
    if (!this.data.funciones.some(f => f.Id === node.Id)) {
      this.data.funciones.push(node);
      if (node.IdFuncionPadre != undefined && !this.data.funciones.some(f => f.Id === node.IdFuncionPadre)) {
        let padre = this.funcionesBBDD.find(f => f.Id === node.IdFuncionPadre);
        this.data.funciones.push(padre);
        if (padre.IdFuncionPadre != undefined && !this.data.funciones.some(f => f.Id === padre.IdFuncionPadre)) {
          let abuelo = this.funcionesBBDD.find(f => f.Id === padre.IdFuncionPadre)
          this.data.funciones.push(this.funcionesBBDD.find(f => f.Id === padre.IdFuncionPadre));
          if (abuelo.IdFuncionPadre != undefined && !this.data.funciones.some(f => f.Id === abuelo.IdFuncionPadre)) {
            this.data.funciones.push(this.funcionesBBDD.find(f => f.Id === abuelo.IdFuncionPadre))
          }
        }
      }
      if (node.InverseIdFuncionPadreNavigation != undefined) {
        node.InverseIdFuncionPadreNavigation.forEach(element => {
          this.onClicked(element)
        });
      }
    }
    else {

      let funcionesBorrar: Funcion[] = []
      funcionesBorrar.push(node)

      // BORRA HACIA ABAJO

      // Si tiene hijos
      if (node.InverseIdFuncionPadreNavigation.length > 0) {
        // Agrega hijos
        funcionesBorrar = funcionesBorrar.concat(node.InverseIdFuncionPadreNavigation)
        // Agrega siguiente nivel
        node.InverseIdFuncionPadreNavigation.forEach(element => {
          funcionesBorrar = funcionesBorrar.concat(element.InverseIdFuncionPadreNavigation)
          // Agrega último nivel
          element.InverseIdFuncionPadreNavigation.forEach(f => {
            funcionesBorrar = funcionesBorrar.concat(f.InverseIdFuncionPadreNavigation)
          })
        })
      }

      // BORRA HACIA ARRIBA
      let listadoAux = this.data.funciones.filter(f => f.Id != node.Id)

      // Si tengo un nodo en un nivel superior y no hay otros nodos en mi mismo nivel con el mismo padre
      if (node.IdFuncionPadre != undefined && !listadoAux.some(f => f.IdFuncionPadre == node.IdFuncionPadre)) {

        let primerNivel = listadoAux.find(f => f.Id == node.IdFuncionPadre)
        // Filtro en el listado para perder lo que ya no necesito
        listadoAux = listadoAux.filter(f => f.Id != node.IdFuncionPadre)
        // Agrego el primer nivel de nodo padre a borrar
        funcionesBorrar.push(primerNivel)

        // Si el primer nivel tenía un nodo, tenía nodo a un nivel superior y este último no tiene otros nodos en el mismo nivel, lo agrego al listado de funciones a borrar
        if (primerNivel != undefined && primerNivel.IdFuncionPadre != undefined && !listadoAux.some(f => f.IdFuncionPadre == primerNivel.IdFuncionPadre)) {

          let segundoNivel = listadoAux.find(f => f.Id == primerNivel.IdFuncionPadre)
          // Filtro en el listado para perder lo que ya no necesito
          listadoAux = listadoAux.filter(f => f.Id != primerNivel.IdFuncionPadre)
          // Agrego el segundo nivel de nodo padre a borrar

          funcionesBorrar.push(segundoNivel)

          // Si el segundo nivel tenía un nodo, tenía nodo a un nivel superior y este último no tiene otros nodos en el mismo nivel, lo agrego al listado de funciones a borrar
          if (segundoNivel != undefined && segundoNivel.IdFuncionPadre != undefined && !listadoAux.some(f => f.IdFuncionPadre == segundoNivel.IdFuncionPadre)) {

            let tercerNivel = listadoAux.find(f => f.Id == segundoNivel.IdFuncionPadre)
            // Agrego el tercer nivel de nodo padre a borrar
            funcionesBorrar.push(tercerNivel)
          }
        }
      }

      funcionesBorrar.forEach(fun => {
        this.data.funciones = this.data.funciones.filter(fs => fs.Id != fun.Id)
      });

      funcionesBorrar = []

    }
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
