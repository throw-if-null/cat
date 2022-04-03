import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { of } from "rxjs";

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
	let component: ErrorComponent;
	let fixture: ComponentFixture<ErrorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ErrorComponent ],
			providers: [ { provide: AuthService, useValue: { error$: of({}) } } ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
