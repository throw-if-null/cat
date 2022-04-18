import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from "@angular/router";
import { ConfigDetailsComponent } from "@cat/config-details";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { navigation, optimisticUpdate } from '@nrwl/angular';
import { map, mapTo } from "rxjs/operators";
import { ConfigurationDataService } from "../config.service";

import * as ConfigurationsActions from './configurations.actions';
import { ConfigurationFacade } from "./configurations.facade";

@Injectable()
export class ConfigurationsEffects {

	loadEntries$ = createEffect(() =>
		this.actions$.pipe(
			// listens for the routerNavigation action from @ngrx/router-store
			navigation(ConfigDetailsComponent, {
				run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
					const { projectId, configId } = activatedRouteSnapshot.params;

					return this.configService.getConfigurationById(projectId, configId)
						.pipe(map(ConfigurationsActions.loadConfigurationEntriesSuccess))
				},
				onError: (
					activatedRouteSnapshot: ActivatedRouteSnapshot,
					error: any
				) => {
					console.error('Error', error);
					return ConfigurationsActions.loadConfigurationEntriesFailure({ error });
				},
			})
		)
	);

	updateConfigurationEntry$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ConfigurationsActions.updateConfigurationEntry),
			optimisticUpdate({
				run: (action: ReturnType<typeof ConfigurationsActions.updateConfigurationEntry>) => {
					const { projectId, configurationId, entry } = action;
					return this.configService.updateConfigurationEntry(projectId, configurationId, entry)
						.pipe(mapTo(ConfigurationsActions.updateConfigurationEntrySuccess({ entry })))
				},
				undoAction: (
					action: ReturnType<typeof ConfigurationsActions.updateConfigurationEntry>,
					error
				) => {
					console.error('Error', error);
					return ConfigurationsActions.undoUpdateConfigurationEntry({ data: error });
				},
			})
		));

	constructor(
		private readonly actions$: Actions,
		private readonly configFacade: ConfigurationFacade,
		private readonly configService: ConfigurationDataService
	) {
	}
}
