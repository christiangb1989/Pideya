import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinalPage } from './final.page';

describe('FinalPage', () => {
  let component: FinalPage;
  let fixture: ComponentFixture<FinalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
