import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodaEditorComponent } from './noda-editor/noda-editor.component';
import { NodaNodeComponent } from './noda-node/noda-node.component';

@NgModule({
	declarations: [
		NodaEditorComponent,
		NodaNodeComponent
	],
	imports: [ CommonModule ],
	exports: [ NodaEditorComponent ]
})
export class NodaModule {
}
