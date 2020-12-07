import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContenidoTextoImagenComponent } from './contenido-texto-imagen.component';

describe('ContenidoTextoImagenComponent', () => {
  let component: ContenidoTextoImagenComponent;
  let fixture: ComponentFixture<ContenidoTextoImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoTextoImagenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContenidoTextoImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
