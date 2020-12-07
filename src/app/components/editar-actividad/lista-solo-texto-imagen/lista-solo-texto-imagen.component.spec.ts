import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaSoloTextoImagenComponent } from './lista-solo-texto-imagen.component';

describe('ListaSoloTextoImagenComponent', () => {
  let component: ListaSoloTextoImagenComponent;
  let fixture: ComponentFixture<ListaSoloTextoImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSoloTextoImagenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaSoloTextoImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
