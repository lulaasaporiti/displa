import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';

@Component({
  selector: 'app-producto-libre',
  templateUrl: './producto-libre.component.html',
  styleUrls: ['./producto-libre.component.css']
})
export class ProductoLibreComponent implements OnInit {
  modelComprobanteItem = <ComprobanteItem>{};

  constructor(
    public dialogRef: MatDialogRef<ProductoLibreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {{}
      event.preventDefault();
    }
  }

  _keyPressDescripcion(event: any) {
    const pattern = /[A-Za-z0-9_@./#&+-]/;
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