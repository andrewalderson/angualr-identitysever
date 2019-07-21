import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationModule } from '../authentication';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationModule,
    HomeRoutingModule
  ],
  declarations: [
      HomeComponent
  ]
})
export class HomeModule { }
