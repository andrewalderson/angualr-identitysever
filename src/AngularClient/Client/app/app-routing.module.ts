import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
        path: '',
        canActivate: [AuthGuardService],
        canLoad: [AuthGuardService],
        children: [
            { path: '', loadChildren: 'app/home/home.module#HomeModule' }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
