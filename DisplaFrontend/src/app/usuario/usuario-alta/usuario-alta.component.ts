import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-usuario-alta',
  templateUrl: './usuario-alta.component.html',
  styleUrls: ['./usuario-alta.component.css']
})
export class UsuarioAltaComponent implements OnInit {

  hidePassword = true;
  hideConfirmPassword = true;
  msgErrorFormato: boolean;
  msgErrorPass: boolean;
  msgMail: boolean = false;
  rolesList: string[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<UsuarioAltaComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.accountService.getRolesList().subscribe(result => {
      // this.setRol();
      result.forEach(r => {
          this.rolesList.push(r);
      });
    });
  }

  onBlurPassVerification(e: Event, pass: string, passVerification: string) {
    // this.msgErrorFormato = (pass.length >= 6 || pass == "") ? false : true;
    this.msgErrorPass = (pass == passVerification || pass == "" || passVerification == "") ? false : true;
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
