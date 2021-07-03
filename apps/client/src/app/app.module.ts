import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@ngneat/dialog';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, RouterModule, AppRoutingModule, DialogModule.forRoot()],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
