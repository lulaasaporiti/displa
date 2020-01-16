import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Usuario } from '../../model/usuario';
import { ChangePasswordView } from '../../model/changePasswordView';
import { AccountService } from 'src/services/account.service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  model = <ChangePasswordView>{};
  hide: boolean = true;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  oldPassword: string = "";
  newPassword: string = "";
  newPasswordVerification: string = "";
  msgErrorPass: boolean;
  msg: string;
  user: Usuario;
  msgErrorFormato: boolean = false;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private accountService: AccountService,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.model.UserName = data.user;
  }

  editarPass(): void {
    this.accountService.changePassword(this.model).subscribe(result => {
      if (result == true) {
        this.sessionService.showSuccess("Has cambiado la contraseña correctamente");
      } else {
        this.sessionService.showError("No se pudo cambiar la contreseña. Intente nuevamente");
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onBlurPassVerification(e: Event, pass: string, passVerification: string) {
    if (pass || passVerification) {
      this.msgErrorFormato = (pass.length >= 6) ? false : true;
      this.msgErrorPass = (pass == passVerification || pass == "" || passVerification == "") ? false : true;
    }
  }
}