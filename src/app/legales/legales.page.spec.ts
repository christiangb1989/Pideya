import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegalesPage } from './legales.page';

describe('LegalesPage', () => {
  let component: LegalesPage;
  let fixture: ComponentFixture<LegalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
