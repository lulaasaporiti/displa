import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountLoginComponent } from './account-login/account-login.component';
import { MaterialModule } from '../material/material.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountUsernameComponent } from './account-username/account-username.component';

@NgModule({
  entryComponents: [ ChangePasswordComponent, AccountUsernameComponent ],
  declarations: [AccountLoginComponent, ResetPasswordComponent, ChangePasswordComponent, AccountUsernameComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
