import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninCallbackComponent } from './components/signin/signin-callback.component';

const routes: Routes = [
    {
        path: 'signin-callback',
        component: SigninCallbackComponent
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
