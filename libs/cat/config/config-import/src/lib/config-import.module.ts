import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ConfigImportComponent } from './config-import.component';

@NgModule({
	imports: [ CommonModule, FormsModule ],
	declarations: [ ConfigImportComponent ],
	exports: [ ConfigImportComponent ],
})
export class ConfigImportModule {
}
