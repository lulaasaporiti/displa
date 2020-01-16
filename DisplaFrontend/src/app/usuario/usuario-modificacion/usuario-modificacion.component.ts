import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-usuario-modificacion',
  templateUrl: './usuario-modificacion.component.html',
  styleUrls: ['./usuario-modificacion.component.css']
})
export class UsuarioModificacionComponent implements OnInit {
  rolesList: string[] = [];
  msgErrorFormato: boolean;
  msgMail: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<UsuarioModificacionComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }

    ngOnInit() {
      this.accountService.getRolesList().subscribe(result => {
        // this.setRol();
        result.forEach(r => {
            this.rolesList.push(r);
        });
      });
    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  chequearEmail() {
    // this.msgMail = false;
    // if (this.data.modelUsuario.email != "") {
    //   this.data.usuarios.forEach(u => {
    //     if (u.email.toLowerCase() == this.data.modelUsuario.email.toLowerCase()) {
    //       this.msgMail = true;
    //     }
    //   });
    // }
  }
}
