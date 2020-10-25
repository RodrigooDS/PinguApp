import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CargarRepasoPage } from './cargar-repaso.page';

describe('CargarRepasoPage', () => {
  let component: CargarRepasoPage;
  let fixture: ComponentFixture<CargarRepasoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarRepasoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CargarRepasoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
