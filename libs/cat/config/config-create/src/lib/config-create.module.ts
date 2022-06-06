import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationFacade } from "@cat/config";
import { ProjectsFacade } from "@cat/project";
import { UiUtilsModule } from "@cat/ui-utils";
import { ConfigCreateComponent } from './config-create.component';

@NgModule({
	imports: [ CommonModule, ReactiveFormsModule, UiUtilsModule ],
	declarations: [ ConfigCreateComponent ],
	exports: [ ConfigCreateComponent ],
	providers: [ ProjectsFacade, ConfigurationFacade ]
})
export class ConfigCreateModule {
}
