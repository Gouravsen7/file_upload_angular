import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgLoaderComponent } from './svg-bar.component';

describe('SvgLoaderComponent', () => {
  let component: SvgLoaderComponent;
  let fixture: ComponentFixture<SvgLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvgLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
