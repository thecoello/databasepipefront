import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HttpService } from './services/httpService';
import { ScrollingModule } from '@angular/cdk/scrolling';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()), provideHttpClient(), HttpService, ScrollingModule],
};
