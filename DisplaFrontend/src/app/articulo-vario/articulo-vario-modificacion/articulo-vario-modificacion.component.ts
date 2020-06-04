import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { PrecioArticulo } from 'src/app/model/precioArticulo';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';

@Component({
  selector: 'app-articulo-vario-modificacion',
  templateUrl: './articulo-vario-modificacion.component.html',
  styleUrls: ['./articulo-vario-modificacion.component.css']
})
export class ArticuloVarioModificacionComponent implements OnInit {
  private id: number = 0;
  tiposArticuloVario: TipoArticulo[];
  selectedPrecio = new EventEmitter<PrecioArticulo[]>();
  modelArticuloVario = <ArticuloVario>{};


  constructor(
    private tipoArticuloVarioService: TipoArticuloService,
    private loadingSpinnerService: LoadingSpinnerService,
    private articuloService: ArticuloVarioService,
    private sessionService: SessionService,
    private segment: ActivatedRoute,
    private router: Router
  ) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number;
    });
    if (this.id) {
      this.loadingSpinnerService.show()
      this.articuloService.getById(this.id)
        .subscribe(av => {
          this.modelArticuloVario = av;
          this.loadingSpinnerService.hide();
        });
    }
  }

  ngOnInit() {
    this.modelArticuloVario.PrecioArticulo = [];
    this.tipoArticuloVarioService.getTiposArticulosVigentesList().subscribe(r => {
      this.tiposArticuloVario = r;
    });
  }


  agregarPrecio() {
    let item = <PrecioArticulo>{};
    this.modelArticuloVario.PrecioArticulo.push(item);
  }

  eliminarUltimoPrecio() {
    this.modelArticuloVario.PrecioArticulo.pop();
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

  modificarArticuloVario(){
    this.articuloService.saveOrUpdateArticuloVario(this.modelArticuloVario)
    .subscribe(
      data => {
        this.router.navigateByUrl('ArticuloVario/Listado')
        this.sessionService.showSuccess("El articulo se ha modificado correctamente.");
      },
      error => {
         // console.log(error)
        this.router.navigateByUrl('ArticuloVario/Listado')
        this.sessionService.showError("El articulo no se modificó.");
      }
    )

  }


  cancelar() {
    this.router.navigateByUrl('ArticuloVario/Listado')
  }
}