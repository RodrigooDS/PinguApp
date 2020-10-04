import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeParte2Component } from './ce-parte2.component';

describe('CeParte2Component', () => {
  let component: CeParte2Component;
  let fixture: ComponentFixture<CeParte2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeParte2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeParte2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
