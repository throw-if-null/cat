import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthHttpInterceptor, AuthModule as Auth0Module } from '@auth0/auth0-angular';
import { DialogModule } from '@ngneat/dialog';
import { TippyModule, tooltipVariation, popperVariation } from '@ngneat/helipopper';
import { HotToastModule } from '@ngneat/hot-toast';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FilterPipe } from './filter.pipe';
import { HttpErrorInterceptor } from './http-error';
import { ProjectTypeNamePipe } from './project-name.pipe';

@NgModule({
  declarations: [AppComponent, FilterPipe],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    Auth0Module.forRoot({
      ...environment.auth0
    }),
    HotToastModule.forRoot(),
    DialogModule.forRoot(),
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
        menu: {
          ...popperVariation,
          appendTo: 'parent'
        }
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
