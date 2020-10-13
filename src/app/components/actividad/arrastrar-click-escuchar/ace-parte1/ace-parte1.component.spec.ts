import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AceParte1Component } from './ace-parte1.component';

describe('AceParte1Component', () => {
  let component: AceParte1Component;
  let fixture: ComponentFixture<AceParte1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceParte1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AceParte1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
