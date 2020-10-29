import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit, EventEmitter, Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Servicio } from 'src/app/model/servicio';
import { TipoServicioService } from 'src/services/tipo.servicio.service';

export class TipoServicio {
  children: Servicio[];
  item: string;
  id: number;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: TipoServicio;
  level: number;
  expandable: boolean;
}

// const TREE_DATA = {
//   Groceries: {
//     'Almond Meal flour': null,
//     'Organic eggs': null,
//     'Protein Powder': null,
//     Fruits: {
//       Apple: null,
//       Berries: ['Blueberry', 'Raspberry'],
//       Orange: null
//     }
//   },
//   Reminders: [
//     'Cook dinner',
//     'Read the Material Design spec',
//     'Upgrade Application to Angular'
//   ]
// };


@Injectable()
export class ChecklistDatabase {
  tipoServicio: [];
  // servicios: string[] = ['CAL O', 'CAL M', 'CAL B', 'CAL L', 'CAL P', 'CAL F', 'CAL L', 'OTROS'];
  dataChange = new BehaviorSubject<TipoServicio[]>([]);

  get data(): TipoServicio[] { return this.dataChange.value; }


  constructor(
    private tipoServicioService: TipoServicioService
  ) {

    this.tipoServicioService.getTiposServiciosVigentesList()
    .subscribe(ti => {
      this.tipoServicio = ti;
      console.log(ti)
      
      
      this.initialize(ti);
    })

  }



  initialize(tipoServicios) {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = tipoServicios;
    console.log(data)

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  // buildFileTree(obj: {[key: string]: any}, level: number): TipoServicio[] {
  //   return Object.keys(obj).reduce<TipoServicio[]>((accumulator, key) => {
  //     const value = obj[key];

  //     const node = new TipoServicio();
  //     node.item = key;
  //     // node.id = id;
     

  //     if (value != null) {
  //       if (typeof value === 'object') {
  //         node.children = this.buildFileTree(value, level + 1);
  //       } else {
  //         node.item = value;
  //       }
  //     }

  //     return accumulator.concat(node);
  //   }, []);
  // }

  /** Add an item to to-do list */
  insertItem(parent: TipoServicio, name: string) {
    if (parent.children) {
      // parent.children.push({item: name} as TipoServicio);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TipoServicio, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }

  
  // _keyPress(event: any) {
  //   const pattern = /[0-9-]/;
  //   let inputChar = String.fromCharCode(event.charCode);

  //   if (!pattern.test(inputChar)) {{}
  //     event.preventDefault();
  //   }
  // }

  // ngOnInit(){

  // }

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
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TipoServicio>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TipoServicio, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TipoServicio, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TipoServicio, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

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

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === null;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TipoServicio, level: number) => {
    const flatNode = new TodoItemFlatNode(); 
    flatNode.item = node;
    flatNode.expandable = true;
    flatNode.level = level;
    console.log(flatNode)
    // && existingNode.item === node.item
    //     ? existingNode
        // :
        //  new TodoItemFlatNode();
    // flatNode. = node;
    // flatNode.level = level;
    // flatNode.expandable = !node.children.length;
    // this.flatNodeMap.set(flatNode);
    // this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
}

