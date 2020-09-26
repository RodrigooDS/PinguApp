import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepasoPage } from './repaso.page';

describe('RepasoPage', () => {
  let component: RepasoPage;
  let fixture: ComponentFixture<RepasoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepasoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepasoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
