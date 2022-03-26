import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProjectsEffects } from './+state/projects.effects';
import { ProjectsFacade } from './+state/projects.facade';
import * as fromProjects from './+state/projects.reducer';
import { ProjectsRoutingModule } from './projects-routing.module';
import { UserModule } from "@cat/user";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ProjectsRoutingModule,
		StoreModule.forFeature(
			fromProjects.PROJECTS_FEATURE_KEY,
			fromProjects.reducer
		),
		EffectsModule.forFeature([ ProjectsEffects ]),
		UserModule
	],
	providers: [ProjectsFacade]
})
export class ProjectsModule {}
