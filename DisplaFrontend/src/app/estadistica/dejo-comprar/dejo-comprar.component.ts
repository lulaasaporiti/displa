import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/services/cliente.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-dejo-comprar',
  templateUrl: './dejo-comprar.component.html',
  styleUrls: ['./dejo-comprar.component.css'],
  providers: [],
})
export class DejoComprarComponent {
  analogo: boolean;
  desde1: Date;
  hasta1: Date;
  desde2: Date;
  hasta2: Date;
  today = new Date();

  constructor(
    private clienteService: ClienteService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<DejoComprarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.desde2 = new Date(this.today.getFullYear(), this.today.getMonth()-1, 1)
    this.hasta2 = new Date(this.today.getFullYear(), this.today.getMonth(), 0)
    this.desde1 = new Date(this.today.getFullYear(), this.today.getMonth()-2, 1)
    this.hasta1 = new Date(this.today.getFullYear(), this.today.getMonth()-1, 0)
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

}