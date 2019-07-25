import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninCallbackComponent } from './components/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './components/signout-callback/signout-callback.component';
import { SignedoutComponent } from './components/signedout/signedout.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule
    ],
  declarations: [
    SigninCallbackComponent,
    SignoutCallbackComponent,
    SignedoutComponent
  ]
})
export class AuthenticationModule { }
