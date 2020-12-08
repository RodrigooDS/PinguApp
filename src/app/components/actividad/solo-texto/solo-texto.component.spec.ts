import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SoloTextoComponent } from './solo-texto.component';

describe('SoloTextoComponent', () => {
  let component: SoloTextoComponent;
  let fixture: ComponentFixture<SoloTextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloTextoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SoloTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
