import { NgModule, ModuleWithProviders, SkipSelf, Optional, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APP_CONFIG, AppConfig } from './app.config';
import { ConfigurationService } from './configuration.service';
import { loadConfiguration, getConfiguration } from './exports';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ConfigurationModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ConfigurationModule,
            providers: [
                ConfigurationService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: loadConfiguration,
                    deps: [ConfigurationService],
                    multi: true
                },
                {
                    provide: APP_CONFIG,
                    useFactory: getConfiguration,
                    deps: [ConfigurationService]
                }
            ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ConfigurationModule) {
        if (parentModule) {
            throw new Error(
                'ConfigurationModule is already loaded. Import it in the AppModule only');
        }
    }

}
