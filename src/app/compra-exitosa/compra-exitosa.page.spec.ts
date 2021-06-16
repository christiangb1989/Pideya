import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompraExitosaPage } from './compra-exitosa.page';

describe('CompraExitosaPage', () => {
  let component: CompraExitosaPage;
  let fixture: ComponentFixture<CompraExitosaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraExitosaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompraExitosaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
