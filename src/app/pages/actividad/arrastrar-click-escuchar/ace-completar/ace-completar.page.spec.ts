import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AceCompletarPage } from './ace-completar.page';

describe('AceCompletarPage', () => {
  let component: AceCompletarPage;
  let fixture: ComponentFixture<AceCompletarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceCompletarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AceCompletarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
