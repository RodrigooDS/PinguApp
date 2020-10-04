import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsociacionPage } from './asociacion.page';

describe('AsociacionPage', () => {
  let component: AsociacionPage;
  let fixture: ComponentFixture<AsociacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsociacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
