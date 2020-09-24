import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalAccionPage } from './modal-accion.page';

describe('ModalAccionPage', () => {
  let component: ModalAccionPage;
  let fixture: ComponentFixture<ModalAccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
