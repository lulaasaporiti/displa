import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';

@Component({
  selector: 'app-producto-totales',
  templateUrl: './producto-totales.component.html',
  styleUrls: ['./producto-totales.component.css']
})
export class ProductoTotalesComponent implements OnInit {
  modelComprobanteItem = <ComprobanteItem>{};

  constructor(
    public dialogRef: MatDialogRef<ProductoTotalesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
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