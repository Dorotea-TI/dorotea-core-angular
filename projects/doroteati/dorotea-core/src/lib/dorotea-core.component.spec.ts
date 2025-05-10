import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoroteaCoreComponent } from './dorotea-core.component';

describe('DoroteaCoreComponent', () => {
  let component: DoroteaCoreComponent;
  let fixture: ComponentFixture<DoroteaCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoroteaCoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoroteaCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
