import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AceAsociarPage } from './ace-asociar.page';

describe('AceAsociarPage', () => {
  let component: AceAsociarPage;
  let fixture: ComponentFixture<AceAsociarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceAsociarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AceAsociarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
