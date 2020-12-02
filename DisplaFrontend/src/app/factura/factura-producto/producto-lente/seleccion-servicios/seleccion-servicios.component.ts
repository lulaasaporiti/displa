import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, Input, Output, SimpleChanges, EventEmitter, Inject } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';
import { ComprobanteItemServicio } from 'src/app/model/comprobanteItemServicio';
import { Servicio } from 'src/app/model/servicio';
import { ServicioService } from 'src/services/servicio.service';
import { TipoServicioService } from 'src/services/tipo.servicio.service';

export class TipoServicio {
  children: TipoServicio[];
  item: string;
  id: number;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: TipoServicio;
  level: number;
  expandable: boolean;
}


@Injectable()
export class ChecklistDatabase {
  tipoServicio: [];
  dataChange = new BehaviorSubject<TipoServicio[]>([]);

  get data(): TipoServicio[] { return this.dataChange.value; }


  constructor(
    private tipoServicioService: TipoServicioService,
    @Inject(MAT_DIALOG_DATA) public dataModal: any) {


    this.tipoServicioService.getServiciosSinCalibrados(this.dataModal.idCliente)
    .subscribe(ti => {
      // console.log(ti)
      // ti =  ti.filter(t => !t.Nombre.startsWith("CAL"));
      this.tipoServicio = ti;     
      this.initialize(ti);
    })

  }



  initialize(tipoServicios) {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(tipoServicios,0);
    // console.log(data)

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TipoServicio[] {
    return Object.keys(obj).reduce<TipoServicio[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TipoServicio();
      node.item = value.Nombre; 
      // node.id = valKCue.Id;
      if (value != null) {
        if (value['Servicio'] != undefined) {          
          // value['Servicio'].forEach(element => {
            node.children = this.buildFileTree(value['Servicio'], level + 1);
          // });
        } else {
          node.item = value;
        }
      }
   
      return accumulator.concat(node);
    }, []);
  }

  // tabInventado(event: KeyboardEvent, idElement)
  // {
  //   if (event.code == "Enter") {
  //     event.preventDefault();
  //     document.getElementById(idElement).focus();
  //   }
  // }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-seleccion-servicios',
  templateUrl: './seleccion-servicios.component.html',
  styleUrls: ['./seleccion-servicios.component.css'],
  providers: [ChecklistDatabase]
})
export class SeleccionServiciosComponent {
  @Input() selectedLente: any[];
  modelLente: any[] = [];
  serviciosSeleccionados: Servicio[] = []; 
  comprobanteItemServicios: ComprobanteItemServicio[] = [];
  @Output() selectedServiciosComprobanteItem = new EventEmitter<any[]>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedLente.currentValue.length > 0) {
      this.modelLente = changes.selectedLente.currentValue;
    }
  }

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TipoServicio, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TipoServicio, TodoItemFlatNode>;


  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TipoServicio): any[] => node.children;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TipoServicio, level: number) => {
    const flatNode = new TodoItemFlatNode(); 
    flatNode.item = node;
    flatNode.expandable = flatNode['item'].item.length >  0;
    flatNode.level = level;
    return flatNode;
  }

  comprobanteItemServiciosSelected() {
    this.selectedServiciosComprobanteItem.emit(this.comprobanteItemServicios);
  }

  onClicked(option) {
    let incluye = this.serviciosSeleccionados.includes(option);
    let comprobanteItemServicio = <ComprobanteItemServicio>{};
    comprobanteItemServicio.IdServicio = option.Id;
    comprobanteItemServicio.IdServicioNavigation = option;
    if (!incluye) {
      this.serviciosSeleccionados.push(option);
      this.comprobanteItemServicios.push(comprobanteItemServicio);
    } else {
      this.serviciosSeleccionados = this.serviciosSeleccionados.filter(s => s != option);
      this.comprobanteItemServicios = this.comprobanteItemServicios.filter(cs => cs != comprobanteItemServicio);
    }
    this.comprobanteItemServiciosSelected();
  }
}

