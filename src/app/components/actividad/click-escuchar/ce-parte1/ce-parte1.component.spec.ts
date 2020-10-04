import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeParte1Component } from './ce-parte1.component';

describe('CeParte1Component', () => {
  let component: CeParte1Component;
  let fixture: ComponentFixture<CeParte1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeParte1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeParte1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
