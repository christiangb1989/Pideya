import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TiendaPage } from './tienda.page';

describe('TiendaPage', () => {
  let component: TiendaPage;
  let fixture: ComponentFixture<TiendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
