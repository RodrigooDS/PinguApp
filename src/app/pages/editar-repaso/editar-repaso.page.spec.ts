import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarRepasoPage } from './editar-repaso.page';

describe('EditarRepasoPage', () => {
  let component: EditarRepasoPage;
  let fixture: ComponentFixture<EditarRepasoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRepasoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarRepasoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
