import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalActividadPage } from './modal-actividad.page';

describe('ModalActividadPage', () => {
  let component: ModalActividadPage;
  let fixture: ComponentFixture<ModalActividadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActividadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
