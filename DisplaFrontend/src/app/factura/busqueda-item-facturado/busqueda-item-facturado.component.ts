import { Component, Inject, OnInit } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-busqueda-item-facturado',
  templateUrl: './busqueda-item-facturado.component.html',
  styleUrls: ['./busqueda-item-facturado.component.css']
})
export class BusquedaItemFacturadoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BusquedaItemFacturadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {{}
      event.preventDefault();
    }
  }

  tabInventado(event: KeyboardEvent, idElement)
  {
    if (event.code == "Enter") {
      event.preventDefault();
      document.getElementById(idElement).focus();
    }
  }
}