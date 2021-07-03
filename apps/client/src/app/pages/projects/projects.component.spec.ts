import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
	let component: ProjectsComponent;
	let fixture: ComponentFixture<ProjectsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProjectsComponent],
			providers: [{ provide: DialogService, useValue: {} }],
			imports: [ReactiveFormsModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
