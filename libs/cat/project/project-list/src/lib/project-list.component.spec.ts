import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from '@ngneat/dialog';

import { ProjectListComponent } from './project-list.component';

describe('ProjectsComponent', () => {
	let component: ProjectListComponent;
	let fixture: ComponentFixture<ProjectListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProjectListComponent],
			providers: [{ provide: DialogService, useValue: {} }],
			imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
