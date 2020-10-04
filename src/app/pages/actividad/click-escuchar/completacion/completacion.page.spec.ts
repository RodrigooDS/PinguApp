import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompletacionPage } from './completacion.page';

describe('CompletacionPage', () => {
  let component: CompletacionPage;
  let fixture: ComponentFixture<CompletacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
