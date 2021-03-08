import { Component, Inject } from '@angular/core';
import { ResetPasswordView } from '../../model/resetPasswordView';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { AccountService } from 'src/services/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MailView } from '../model/mail';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  reset = <ResetPasswordView>{};
  hidePassword = true;
  message: boolean;
  hideConfirmPassword = true;
  msgErrorPass: boolean = false;
  msgErrorFormato: boolean = false;

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private accountService: AccountService,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) {
      this.reset.UserName = data.user;
    this.accountService.forgotPassword(data.user).subscribe(result => {
      this.reset.Code = result;
      console.log(result)
    }); 
    // this.segment.queryParams.subscribe((params: Params) => {
    //   this.reset.Code = params['code'];
    // });
  }

  resetPassword() {
    this.accountService.resetPassword(this.reset).subscribe(
      result => {
        if (result == true) {
          this.sessionService.showSuccess("Has restablecido la contraseña correctamente")
        } else {
          this.sessionService.showError("No se pudo restablecer la contreseña. Intente nuevamente")
        }
        this.router.navigateByUrl('/Usuario/Listado');
      }
    );
  }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }


  onBlurPassVerification(e: Event, pass: string, passVerification: string) {
    this.msgErrorFormato = (pass != "" && pass.length >= 6) ? false : true;
    this.msgErrorPass = (pass == passVerification || pass == "" || passVerification == "") ? false : true;
  }
}
