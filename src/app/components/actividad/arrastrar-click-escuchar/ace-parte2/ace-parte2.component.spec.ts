import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AceParte2Component } from './ace-parte2.component';

describe('AceParte2Component', () => {
  let component: AceParte2Component;
  let fixture: ComponentFixture<AceParte2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceParte2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AceParte2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
