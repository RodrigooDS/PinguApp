import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeEstadisticaPage } from './ce-estadistica.page';

describe('CeEstadisticaPage', () => {
  let component: CeEstadisticaPage;
  let fixture: ComponentFixture<CeEstadisticaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeEstadisticaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeEstadisticaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
