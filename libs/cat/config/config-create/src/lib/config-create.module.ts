import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigCreateComponent } from './config-create.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	declarations: [ConfigCreateComponent],
	exports: [ConfigCreateComponent]
})
export class ConfigCreateModule {}
