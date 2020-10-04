import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsociacionComponent } from './asociacion.component';

describe('AsociacionComponent', () => {
  let component: AsociacionComponent;
  let fixture: ComponentFixture<AsociacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
