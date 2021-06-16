import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RutaPage } from './ruta.page';

describe('RutaPage', () => {
  let component: RutaPage;
  let fixture: ComponentFixture<RutaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
