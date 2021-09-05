import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from '@cat/ui';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
	declarations: [ProfileComponent],
	imports: [CommonModule, ProfileRoutingModule, UiModule],
	providers: []
})
export class ProfileModule {}
