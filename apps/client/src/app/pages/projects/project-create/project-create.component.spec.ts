import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

import { ProjectCreateComponent } from './project-create.component';

describe('ProjectCreateComponent', () => {
	let component: ProjectCreateComponent;
	let fixture: ComponentFixture<ProjectCreateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProjectCreateComponent],
			providers: [{ provide: DialogRef, useValue: {} }],
			imports: [ReactiveFormsModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectCreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
