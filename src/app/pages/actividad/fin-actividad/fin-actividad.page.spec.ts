import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinActividadPage } from './fin-actividad.page';

describe('FinActividadPage', () => {
  let component: FinActividadPage;
  let fixture: ComponentFixture<FinActividadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinActividadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
