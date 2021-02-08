import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionPageComponent } from './vision-page.component';

describe('VisionPageComponent', () => {
    let component: VisionPageComponent;
    let fixture: ComponentFixture<VisionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [VisionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
      fixture = TestBed.createComponent(VisionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
