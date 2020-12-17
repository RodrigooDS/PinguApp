import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsignacionAlumnosPage } from './asignacion-alumnos.page';

describe('AsignacionAlumnosPage', () => {
  let component: AsignacionAlumnosPage;
  let fixture: ComponentFixture<AsignacionAlumnosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionAlumnosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignacionAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
