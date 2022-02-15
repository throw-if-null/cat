import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodaNodeComponent } from './noda-node.component';

describe('NodaNodeComponent', () => {
  let component: NodaNodeComponent;
  let fixture: ComponentFixture<NodaNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodaNodeComponent ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodaNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
