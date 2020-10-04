import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompletacionComponent } from './completacion.component';

describe('CompletacionComponent', () => {
  let component: CompletacionComponent;
  let fixture: ComponentFixture<CompletacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
