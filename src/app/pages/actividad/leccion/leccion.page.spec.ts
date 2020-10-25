import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeccionPage } from './leccion.page';

describe('LeccionPage', () => {
  let component: LeccionPage;
  let fixture: ComponentFixture<LeccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
