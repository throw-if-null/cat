import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from "@angular/router";
import { ConfigDetailsComponent } from "@cat/config-details";
import { HotToastService } from "@ngneat/hot-toast";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, navigation, optimisticUpdate } from '@nrwl/angular';
import { map, mapTo } from "rxjs/operators";
import { ConfigurationDataService } from "../config.service";

import * as ConfigurationsActions from './configurations.actions';

@Injectable()
export class ConfigurationsEffects {

	loadConfiguration$ = createEffect(() =>
		this.actions$.pipe(
			// listens for the routerNavigation action from @ngrx/router-store
			navigation(ConfigDetailsComponent, {
				run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
					const { configId, projectId } = activatedRouteSnapshot.params;

					return this.configService.getConfigurationById(configId)
						.pipe(map(configuration => ConfigurationsActions.loadConfigurationSuccess({
							configuration,
							projectId
						})))
				},
				onError: (
					activatedRouteSnapshot: ActivatedRouteSnapshot,
					error: any
				) => {
					console.error('Error', error);
					return ConfigurationsActions.loadConfigurationFailure({ error });
				},
			})
		)
	);


	createConfigurationEntry$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ConfigurationsActions.createConfigurationEntry),
			fetch({
				run: ({ configurationId, entry }) => {
					return this.configService.createConfigurationEntry(configurationId, entry)
						.pipe(
							map((response) => (ConfigurationsActions.createConfigurationEntrySuccess({ entry: { ...entry, ...response } })))
						);
				},
				onError: (action, error) => {
					console.error('Error', error);
					return ConfigurationsActions.createConfigurationEntryFailure({ error });
				}
			})
		));

	updateConfigurationEntry$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ConfigurationsActions.updateConfigurationEntry),
			optimisticUpdate({
				run: (action: ReturnType<typeof ConfigurationsActions.updateConfigurationEntry>) => {
					const { configurationId, entry } = action;
					return this.configService.updateConfigurationEntry(configurationId, entry)
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

	deleteConfigurationEntry$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ConfigurationsActions.deleteConfigurationEntry),
			optimisticUpdate({
				run: (action: ReturnType<typeof ConfigurationsActions.deleteConfigurationEntry>) => {
					const { configurationId, entryId } = action;
					return this.configService.deleteConfigurationEntry(entryId, configurationId)
						.pipe(mapTo(ConfigurationsActions.deleteConfigurationEntrySuccess({ entryId })))
				},
				undoAction: (
					action: ReturnType<typeof ConfigurationsActions.deleteConfigurationEntry>,
					error
				) => {
					console.error('Error', error);
					return ConfigurationsActions.undoUpdateConfigurationEntry({ data: error });
				},
			})
		));

	constructor(
		private readonly actions$: Actions,
		private readonly toast: HotToastService,
		private readonly configService: ConfigurationDataService
	) {
	}
}
