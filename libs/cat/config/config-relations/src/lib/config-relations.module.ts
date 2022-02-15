import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigRelationsComponent } from './config-relations.component';
import { NodaModule } from "@ratcat/noda";

@NgModule({
	imports: [
		CommonModule,
		NodaModule
	],
	declarations: [
		ConfigRelationsComponent
	],
})
export class ConfigRelationsModule {
}
