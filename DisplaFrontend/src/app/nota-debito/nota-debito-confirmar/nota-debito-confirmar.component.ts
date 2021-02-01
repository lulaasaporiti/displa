import { Component, Inject, OnInit } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';

@Component({
  selector: 'app-nota-debito-confirmar',
  templateUrl: './nota-debito-confirmar.component.html',
  styleUrls: ['./nota-debito-confirmar.component.css']
})
export class NotaDebitoConfirmarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotaDebitoConfirmarComponent>,
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