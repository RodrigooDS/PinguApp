import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContenidoSoloImagenesComponent } from './contenido-solo-imagenes.component';

describe('ContenidoSoloImagenesComponent', () => {
  let component: ContenidoSoloImagenesComponent;
  let fixture: ComponentFixture<ContenidoSoloImagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoSoloImagenesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContenidoSoloImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
