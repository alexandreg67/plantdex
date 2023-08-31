import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddPlantComponent } from './page-add-plant.component';

describe('PageAddPlantComponent', () => {
  let component: PageAddPlantComponent;
  let fixture: ComponentFixture<PageAddPlantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAddPlantComponent]
    });
    fixture = TestBed.createComponent(PageAddPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
