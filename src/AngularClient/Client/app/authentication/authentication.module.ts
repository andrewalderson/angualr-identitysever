import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninCallbackComponent } from './components/signin/signin-callback.component';
import { SignoutCallbackComponent } from './components/signout/signout-callback.component';
import { SignoutComponent } from './components/signout/signout.component';
import { SignedoutComponent } from './components/signout/signedout.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule
    ],
  declarations: [SigninCallbackComponent, SignoutCallbackComponent, SignoutComponent, SignedoutComponent, SigninComponent],
  exports: [SignoutComponent]
})
export class AuthenticationModule { }