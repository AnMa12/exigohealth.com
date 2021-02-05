import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionpageComponent } from './visionpage.component';

describe('VisionpageComponent', () => {
  let component: VisionpageComponent;
  let fixture: ComponentFixture<VisionpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisionpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
