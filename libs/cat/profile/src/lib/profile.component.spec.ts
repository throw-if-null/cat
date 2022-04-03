import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";
import { CardComponent } from "@cat/ui";
import { UserFacade, UserFacadeMock } from "@cat/user";

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ProfileComponent, CardComponent ],
			imports: [ ReactiveFormsModule ],
			providers: [ { provide: UserFacade, useClass: UserFacadeMock } ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
