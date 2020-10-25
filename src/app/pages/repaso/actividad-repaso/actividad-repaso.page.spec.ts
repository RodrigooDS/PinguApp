import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActividadRepasoPage } from './actividad-repaso.page';

describe('ActividadRepasoPage', () => {
  let component: ActividadRepasoPage;
  let fixture: ComponentFixture<ActividadRepasoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadRepasoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadRepasoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
