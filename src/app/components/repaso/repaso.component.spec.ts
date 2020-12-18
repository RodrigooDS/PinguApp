import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepasoComponent } from './repaso.component';

describe('RepasoComponent', () => {
  let component: RepasoComponent;
  let fixture: ComponentFixture<RepasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepasoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
