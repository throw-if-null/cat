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

@NgModule({
	declarations: [AppComponent, FilterPipe],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		HttpClientModule,
		Auth0Module.forRoot({
			domain: environment.auth0.domain,
			clientId: environment.auth0.clientId
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
		{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
