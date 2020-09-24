import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarActividadPage } from './editar-actividad.page';

describe('EditarActividadPage', () => {
  let component: EditarActividadPage;
  let fixture: ComponentFixture<EditarActividadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarActividadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
