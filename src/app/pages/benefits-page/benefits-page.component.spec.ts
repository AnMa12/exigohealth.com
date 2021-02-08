import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsPageComponent } from './benefits-page.component';

describe('BenefitsPageComponent', () => {
  let component: BenefitsPageComponent;
  let fixture: ComponentFixture<BenefitsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
