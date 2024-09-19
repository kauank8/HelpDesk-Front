import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr'
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask'


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), 
    provideAnimationsAsync(), provideToastr(), provideAnimations(), provideHttpClient(
      withInterceptors([
        authInterceptor
  ])
    ), provideEnvironmentNgxMask(), 
    
    ]}
;
