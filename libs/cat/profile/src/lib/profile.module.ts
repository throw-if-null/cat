import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@cat/ui';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
	declarations: [ProfileComponent],
	imports: [CommonModule, ProfileRoutingModule, UiModule, ReactiveFormsModule],
	providers: []
})
export class ProfileModule {}
