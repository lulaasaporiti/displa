import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, Input, Output, SimpleChanges, EventEmitter, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { ComprobanteItemServicio } from 'src/app/model/comprobanteItemServicio';
import { Servicio } from 'src/app/model/servicio';
import { SessionService } from 'src/services/session.service';
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
  public expandable: boolean;
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
export class SeleccionServiciosComponent implements OnInit{
  @Input() selectedLente: any[];
  @Input() selectedCalibrados: any[];
  @Input() selectedIndiceCalibrados: any[];
  modelLente: any[] = [];
  serviciosSeleccionados: Servicio[] = []; 
  comprobanteItemServicios: ComprobanteItemServicio[] = [];
  @Output() selectedServiciosComprobanteItem = new EventEmitter<any[]>();
  @Output() selectedIdServicio = new EventEmitter<number>();

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TipoServicio, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TipoServicio, TodoItemFlatNode>;


  constructor(private _database: ChecklistDatabase,
    private sessionService: SessionService, 
    private changeDetector: ChangeDetectorRef) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable ;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

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

  
  ngOnInit() {
    this.changeDetector.detectChanges();
   }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedLente != undefined && changes.selectedLente.currentValue.length > 0) {
      this.modelLente = changes.selectedLente.currentValue;
    }
    if (changes.selectedCalibrados != undefined && changes.selectedCalibrados.currentValue.length > 0) {
      this.serviciosSeleccionados[0] = this.selectedCalibrados[0].IdServicioNavigation;
      this.comprobanteItemServicios = this.selectedCalibrados;
    }
    if (changes.selectedIndexCalibrados != undefined && changes.selectedIndexCalibrados.currentValue >= 0) {
      let comprobanteItemServicio = <ComprobanteItemServicio>{};
      comprobanteItemServicio.IdServicio = this.serviciosSeleccionados[0].Id;
      comprobanteItemServicio.IdServicioNavigation = this.serviciosSeleccionados[0];
      this.comprobanteItemServicios[0] = comprobanteItemServicio;
    }
  }

  deshabilitarCheck(option) {
    let optionEsta = this.comprobanteItemServicios.find(cs => cs.IdServicio == option.Id);
    if (this.comprobanteItemServicios.length >= 2) {
      if (optionEsta) {
        return false;
      }
      else {
        return true;
      }
    }
  }

  comprobanteItemServiciosSelected() {
    this.selectedServiciosComprobanteItem.emit(this.comprobanteItemServicios);
  }

  idServicioSelected(i) {
    this.selectedIdServicio.emit(i);
  }

  onClicked(option) {
    this.serviciosSeleccionados[0] = this.selectedCalibrados[0].IdServicioNavigation;
    this.comprobanteItemServicios = this.selectedCalibrados;
    let incluye = this.serviciosSeleccionados.includes(option);
    let comprobanteItemServicio = <ComprobanteItemServicio>{};
    comprobanteItemServicio.IdServicio = option.Id;
    comprobanteItemServicio.IdServicioNavigation = option;
    if (!incluye) {
      this.serviciosSeleccionados.push(option);
      this.comprobanteItemServicios.push(comprobanteItemServicio);
      this.comprobanteItemServiciosSelected();
    } else {
      // console.log(this.comprobanteItemServicios.findIndex(cs => cs.IdServicio != comprobanteItemServicio.IdServicio))
      this.idServicioSelected(comprobanteItemServicio.IdServicio);
      this.serviciosSeleccionados = this.serviciosSeleccionados.splice(this.serviciosSeleccionados.findIndex(s => s != option), 1);
      // this.comprobanteItemServicios = this.comprobanteItemServicios.splice(this.comprobanteItemServicios.findIndex(cs => cs.IdServicio != comprobanteItemServicio.IdServicio), 1);
      // this.comprobanteItemServiciosSelected();
    }
    if (this.serviciosSeleccionados.length == 2) 
      this.sessionService.showInfo("Recuerde que se pueden seleccionar hasta dos servicios");
  }
}

