import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeAsociarPage } from './ce-asociar.page';

describe('CeAsociarPage', () => {
  let component: CeAsociarPage;
  let fixture: ComponentFixture<CeAsociarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeAsociarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeAsociarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
