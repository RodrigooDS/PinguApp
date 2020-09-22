import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormloginComponent } from './formlogin.component';

describe('FormloginComponent', () => {
  let component: FormloginComponent;
  let fixture: ComponentFixture<FormloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormloginComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
