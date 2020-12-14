import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerEstadisticaPage } from './ver-estadistica.page';

describe('VerEstadisticaPage', () => {
  let component: VerEstadisticaPage;
  let fixture: ComponentFixture<VerEstadisticaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEstadisticaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerEstadisticaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
