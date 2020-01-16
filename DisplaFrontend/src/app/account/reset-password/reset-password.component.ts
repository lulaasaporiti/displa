import { Component } from '@angular/core';
import { ResetPasswordView } from '../../model/resetPasswordView';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { AccountService } from 'src/services/account.service';
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
  // mail = <MailView>{};
  hideConfirmPassword = true;
  msgErrorPass: boolean = false;
  msgErrorFormato: boolean = false;

  constructor(private segment: ActivatedRoute,
    private accountService: AccountService,
    private sessionService: SessionService,
    private router: Router) {
    if (this.sessionService.isAuthenticated()) {
      this.router.navigateByUrl('/Liquidacion/Operativos');
    }
    this.segment.queryParams.subscribe((params: Params) => {
      this.reset.Code = params['code'];
    });
  }

  resetPassword() {
    this.accountService.resetPassword(this.reset).subscribe(
      result => {
        if (result == true) {
          this.sessionService.showSuccess("Has restablecido la contraseña correctamente")
        } else {
          this.sessionService.showError("No se pudo restablecer la contreseña. Intente nuevamente")
        }
        this.router.navigateByUrl('/Account/Login');
      }
    );
  }

  onBlurPassVerification(e: Event, pass: string, passVerification: string) {
    this.msgErrorFormato = (pass.length >= 6) ? false : true;
    this.msgErrorPass = (pass == passVerification || pass == "" || passVerification == "") ? false : true;
  }
}
