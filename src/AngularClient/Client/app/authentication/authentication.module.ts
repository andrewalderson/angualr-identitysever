import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninCallbackComponent } from './components/signin/signin-callback.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule
    ],
    declarations: [SigninCallbackComponent]
})
export class AuthenticationModule { }