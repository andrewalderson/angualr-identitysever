import { NgModule, ModuleWithProviders } from '@angular/core';
import {
    AuthService,
    AuthGuardService
} from "./exports";


@NgModule({
  imports: [
  ],
  declarations: [
  ]
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService,
                AuthGuardService
            ]
        }
    }
}
