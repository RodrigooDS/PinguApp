import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsignacionAgregarAlumnoPage } from './asignacion-agregar-alumno.page';

describe('AsignacionAgregarAlumnoPage', () => {
  let component: AsignacionAgregarAlumnoPage;
  let fixture: ComponentFixture<AsignacionAgregarAlumnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionAgregarAlumnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignacionAgregarAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
