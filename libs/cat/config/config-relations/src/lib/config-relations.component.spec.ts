import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRelationsComponent } from './config-relations.component';

describe('ConfigRelationsComponent', () => {
  let component: ConfigRelationsComponent;
  let fixture: ComponentFixture<ConfigRelationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigRelationsComponent ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
