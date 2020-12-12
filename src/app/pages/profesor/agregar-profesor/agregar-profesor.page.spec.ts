import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarProfesorPage } from './agregar-profesor.page';

describe('AgregarProfesorPage', () => {
  let component: AgregarProfesorPage;
  let fixture: ComponentFixture<AgregarProfesorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarProfesorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
