import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComprarPage } from './comprar.page';

describe('ComprarPage', () => {
  let component: ComprarPage;
  let fixture: ComponentFixture<ComprarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComprarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
