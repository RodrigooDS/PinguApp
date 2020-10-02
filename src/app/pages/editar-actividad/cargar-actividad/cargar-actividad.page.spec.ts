import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CargarActividadPage } from './cargar-actividad.page';

describe('CargarActividadPage', () => {
  let component: CargarActividadPage;
  let fixture: ComponentFixture<CargarActividadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarActividadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CargarActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
