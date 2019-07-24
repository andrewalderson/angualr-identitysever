import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { baseUrlProvider } from 'libs/configuration';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([baseUrlProvider])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
