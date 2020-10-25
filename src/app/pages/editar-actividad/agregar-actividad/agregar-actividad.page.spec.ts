import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarActividadPage } from './agregar-actividad.page';

describe('AgregarActividadPage', () => {
  let component: AgregarActividadPage;
  let fixture: ComponentFixture<AgregarActividadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarActividadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
