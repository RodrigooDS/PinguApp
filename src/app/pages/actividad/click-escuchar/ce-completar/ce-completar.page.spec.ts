import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeCompletarPage } from './ce-completar.page';

describe('CeCompletarPage', () => {
  let component: CeCompletarPage;
  let fixture: ComponentFixture<CeCompletarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeCompletarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeCompletarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
