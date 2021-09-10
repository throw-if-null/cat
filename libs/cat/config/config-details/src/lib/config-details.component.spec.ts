import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService, MockProjectService } from '@cat/project';

import { ConfigDetailsComponent } from './config-details.component';

describe('ConfigDetailsComponent', () => {
	let component: ConfigDetailsComponent;
	let fixture: ComponentFixture<ConfigDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ConfigDetailsComponent],
			providers: [{ provide: ProjectService, useClass: MockProjectService }],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfigDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
