import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodaEditorComponent } from './noda-editor.component';

describe('NodaEditorComponent', () => {
  let component: NodaEditorComponent;
  let fixture: ComponentFixture<NodaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodaEditorComponent ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
