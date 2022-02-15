import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { UserFacade } from "@cat/user";
import { UserFacadeMock } from "../../../user/src/lib/+state/user.facade.mock";

describe('ProfileComponent', () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ProfileComponent ],
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
