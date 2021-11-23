import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ProjectsActions from './projects.actions';
import { ProjectsEffects } from './projects.effects';
import { ProjectsFacade } from './projects.facade';
import { ProjectsEntity } from './projects.models';
import { PROJECTS_FEATURE_KEY, reducer, State } from './projects.reducer';
import { MockProjectService, ProjectService } from "@cat/project";

interface TestSchema {
	projects: State;
}

describe('ProjectsFacade', () => {
	let facade: ProjectsFacade;
	let store: Store<TestSchema>;
	const createProjectsEntity = (id: number, name = ''): ProjectsEntity => ({
		id,
		name: name || `name-${ id }`,
		typeId: 0,
		totalEntryCount: 0,
		totalConfigurationCount: 0
	});

	describe('used in NgModule', () => {
		beforeEach(() => {
			@NgModule({
				imports: [
					StoreModule.forFeature(PROJECTS_FEATURE_KEY, reducer),
					EffectsModule.forFeature([ ProjectsEffects ]),
				],
				providers: [
					ProjectsFacade,
					{ provide: ProjectService, useClass: MockProjectService }
				]
			})
			class CustomFeatureModule {
			}

			@NgModule({
				imports: [
					NxModule.forRoot(),
					StoreModule.forRoot({}),
					EffectsModule.forRoot([]),
					CustomFeatureModule
				]
			})
			class RootModule {
			}

			TestBed.configureTestingModule({ imports: [ RootModule ] });

			store = TestBed.inject(Store);
			facade = TestBed.inject(ProjectsFacade);
		});

		/**
		 * The initially generated facade::loadAll() returns empty array
		 */
		it('loadAll() should return empty list with loaded == true', async () => {
			let list = await readFirst(facade.allProjects$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			facade.init();

			list = await readFirst(facade.allProjects$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(1);
			expect(isLoaded).toBe(true);
		});

		/**
		 * Use `loadProjectsSuccess` to manually update list
		 */
		it('allProjects$ should return the loaded list; and loaded flag == true', async () => {
			let list = await readFirst(facade.allProjects$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			store.dispatch(
				ProjectsActions.loadProjectsSuccess({
					projects: [ createProjectsEntity(1), createProjectsEntity(2) ]
				})
			);

			list = await readFirst(facade.allProjects$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(2);
			expect(isLoaded).toBe(true);
		});
	});
});
