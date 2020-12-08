import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesarrolloActividadPage } from './desarrollo-actividad.page';

describe('DesarrolloActividadPage', () => {
  let component: DesarrolloActividadPage;
  let fixture: ComponentFixture<DesarrolloActividadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesarrolloActividadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesarrolloActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
