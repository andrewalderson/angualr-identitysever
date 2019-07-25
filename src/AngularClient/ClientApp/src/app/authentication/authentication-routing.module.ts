import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninCallbackComponent } from './components/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './components/signout-callback/signout-callback.component';
import { SignedoutComponent } from './components/signedout/signedout.component';

const routes: Routes = [
    {
        path: 'signin-callback',
        component: SigninCallbackComponent
    },
    {
        path: 'signout-callback',
        component: SignoutCallbackComponent
    },
    {
        path: 'signedout',
        component: SignedoutComponent
    }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
