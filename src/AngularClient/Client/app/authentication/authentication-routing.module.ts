import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninCallbackComponent } from './components/signin/signin-callback.component';
import { SignoutCallbackComponent } from './components/signout/signout-callback.component';
import { SignedoutComponent } from './components/signout/signedout.component';

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
