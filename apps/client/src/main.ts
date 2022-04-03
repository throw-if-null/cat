import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LogLevel } from "@cat/domain";
import { Logger } from "@ratcat/logger";

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// provide build info globally
if (window) {
  window.rat = window.rat || {};
  window.rat.build = environment.build;
}

Logger.logLevel = LogLevel.DEBUG;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
