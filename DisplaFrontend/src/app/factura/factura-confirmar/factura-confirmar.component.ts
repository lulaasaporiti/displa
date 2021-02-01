import { Component, Inject, OnInit } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';

@Component({
  selector: 'app-factura-confirmar',
  templateUrl: './factura-confirmar.component.html',
  styleUrls: ['./factura-confirmar.component.css']
})
export class FacturaConfirmarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FacturaConfirmarComponent>,
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