import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from '@ngneat/dialog';

import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
	let component: ProjectDetailsComponent;
	let fixture: ComponentFixture<ProjectDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, HttpClientTestingModule],
			declarations: [ProjectDetailsComponent],
			providers: [{ provide: DialogService, useValue: {} }],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
