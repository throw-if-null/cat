import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthHttpInterceptor, AuthModule as Auth0Module } from '@auth0/auth0-angular';
import { UiModule } from '@cat/ui';
import { UserModule } from "@cat/user";
import { ApplicationinsightsAngularpluginErrorService } from '@microsoft/applicationinsights-angularplugin-js';
import { DialogModule } from '@ngneat/dialog';
import { popperVariation, TippyModule, tooltipVariation } from '@ngneat/helipopper';
import { HotToastModule } from '@ngneat/hot-toast';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [ AppComponent ],
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
		}),
		UiModule,
		UserModule,
		StoreModule.forRoot(
			{},
			{
				metaReducers: !environment.production ? [] : [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true
				}
			}
		),
		EffectsModule.forRoot([]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		StoreRouterConnectingModule.forRoot()
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
		{ provide: ErrorHandler, useClass: ApplicationinsightsAngularpluginErrorService },
		{
			provide: 'RAT_API_URL',
			useValue: environment.rat.mock ? 'https://d6d03ebf-d5bc-46cf-ab03-69205269a55e.mock.pstmn.io' : environment.rat.apiUri
		},
		{
			provide: 'APPINSIGHTS_KEY',
			useValue: environment.applicationInsights.instrumentationKey
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}
