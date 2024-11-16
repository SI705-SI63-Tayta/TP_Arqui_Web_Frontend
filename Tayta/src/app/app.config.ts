import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch,withInterceptorsFromDi } from '@angular/common/http';
import {LayoutModule} from '@angular/cdk/layout'
import { JwtModule } from '@auth0/angular-jwt';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideNativeDateAdapter } from '@angular/material/core';

export function tokenGetter() {

  if(typeof window !== 'undefined'){
    return sessionStorage.getItem('token');
  }else{
    return null;
  }

}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient(withFetch(), withInterceptorsFromDi()), provideAnimationsAsync(),LayoutModule,provideNativeDateAdapter(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8081'],
          //allowedDomains: ['52.167.229.156:8081'],
          //disallowedRoutes: ['http://52.167.229.156:8081/login/forget'],
          disallowedRoutes: ['http://localhost:8081/login/forget'],
        },
      })
    ), provideCharts(withDefaultRegisterables()),
  ]
};



