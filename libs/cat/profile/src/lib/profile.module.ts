import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@cat/ui';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserModule } from "@cat/user";
import { UiUtilsModule } from "@cat/ui-utils";

@NgModule({
	declarations: [ ProfileComponent ],
	imports: [ CommonModule, ProfileRoutingModule, UiModule, UiUtilsModule, ReactiveFormsModule, UserModule ],
	providers: []
})
export class ProfileModule {}
