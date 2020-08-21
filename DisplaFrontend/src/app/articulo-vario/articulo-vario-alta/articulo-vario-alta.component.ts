import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { PrecioArticulo } from 'src/app/model/precioArticulo';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulo-vario-alta',
  templateUrl: './articulo-vario-alta.component.html',
  styleUrls: ['./articulo-vario-alta.component.css']
})
export class ArticuloVarioAltaComponent implements OnInit {
  tiposArticuloVario: TipoArticulo[];
  modelArticuloVario = <ArticuloVario>{};
  modelPrecio: PrecioArticulo[] = [];
  selectedPrecio = new EventEmitter<PrecioArticulo[]>();


  constructor(
    private tipoArticuloVarioService: TipoArticuloService,
    private articuloService: ArticuloVarioService,
    private sessionService: SessionService,
    private router: Router) {
  }

  ngOnInit() {
    this.modelArticuloVario.PrecioArticulo = [];
    this.tipoArticuloVarioService.getTiposArticulosVigentesList().subscribe(r => {
      this.tiposArticuloVario = r;
    });
  }

  agregarPrecio() {
    let item = <PrecioArticulo>{};
    item.IdArticulo = this.modelArticuloVario.Id;
    this.modelPrecio.push(item);
  }

  eliminarPrecio(index) {
    this.modelPrecio.splice(index, 1);
    this.updateStatePrecio();
  }


  precioSelected() {
    this.updateStatePrecio();
  }

  updateStatePrecio() {
    //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
    //y el ngOnChanges() lo detecte
    let modelPrecio = JSON.parse(JSON.stringify(this.modelArticuloVario.PrecioArticulo));
    this.selectedPrecio.emit(modelPrecio);
  }


  altaArticuloVario(){
    this.articuloService.saveOrUpdateArticuloVario(this.modelArticuloVario)
    .subscribe( 
      data => {
        this.router.navigateByUrl('ArticuloVario/Listado')
        this.sessionService.showSuccess("El articulo se ha agregado correctamente.");
      },
      error => {
         // console.log(error)
        this.router.navigateByUrl('ArticuloVario/Listado')
        this.sessionService.showError("El articulo no se agregó.");
      }
    )
  }

  cancelar(){
    this.router.navigateByUrl('ArticuloVario/Listado')
  }


}
