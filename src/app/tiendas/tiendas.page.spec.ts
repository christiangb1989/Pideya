import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TiendasPage } from './tiendas.page';

describe('TiendasPage', () => {
  let component: TiendasPage;
  let fixture: ComponentFixture<TiendasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TiendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
