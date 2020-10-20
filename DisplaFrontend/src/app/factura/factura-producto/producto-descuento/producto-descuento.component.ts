import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ServicioService } from 'src/services/servicio.service';
import { ClienteService } from 'src/services/cliente.service';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';

@Component({
  selector: 'app-producto-descuento',
  templateUrl: './producto-descuento.component.html',
  styleUrls: ['./producto-descuento.component.css']
})
export class ProductoDescuentoComponent implements OnInit {
  modelComprobanteItem = <ComprobanteItem>{};

  constructor(
    public dialogRef: MatDialogRef<ProductoDescuentoComponent>,
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