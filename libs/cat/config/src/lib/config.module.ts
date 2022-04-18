import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromConfigurations from './+state/configurations.reducer';
import { ConfigurationsEffects } from './+state/configurations.effects';
import { ConfigurationFacade } from './+state/configurations.facade';
import { ConfigRoutingModule } from "./config-routing.module";

@NgModule({
	imports: [
		CommonModule,
		ConfigRoutingModule,
		StoreModule.forFeature(
			fromConfigurations.CONFIGURATIONS_FEATURE_KEY,
			fromConfigurations.reducer
		),
		EffectsModule.forFeature([ ConfigurationsEffects ]),
	],
	providers: [ ConfigurationFacade ],
})
export class ConfigModule {
}
