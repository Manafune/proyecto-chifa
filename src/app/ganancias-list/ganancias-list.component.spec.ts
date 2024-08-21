import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GananciasListComponent } from './ganancias-list.component';

describe('GananciasListComponent', () => {
  let component: GananciasListComponent;
  let fixture: ComponentFixture<GananciasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GananciasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GananciasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
