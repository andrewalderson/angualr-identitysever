import { NgModule, ModuleWithProviders, SkipSelf, Optional, APP_INITIALIZER } from '@angular/core';
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

    constructor( @Optional() @SkipSelf() parentModule: SharedModule) {
        if (parentModule) {
            throw new Error(
                'SharedModule is already loaded. Import it in the AppModule only');
        }
    }
}
