import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SoloTextoPage } from './solo-texto.page';

describe('SoloTextoPage', () => {
  let component: SoloTextoPage;
  let fixture: ComponentFixture<SoloTextoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloTextoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SoloTextoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
