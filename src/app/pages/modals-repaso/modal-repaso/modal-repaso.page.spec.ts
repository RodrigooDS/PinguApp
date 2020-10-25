import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRepasoPage } from './modal-repaso.page';

describe('ModalRepasoPage', () => {
  let component: ModalRepasoPage;
  let fixture: ComponentFixture<ModalRepasoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRepasoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRepasoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
