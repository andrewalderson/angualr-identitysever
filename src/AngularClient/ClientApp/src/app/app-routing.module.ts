import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'libs/shared';

const routes: Routes = [
  {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
