import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductoPage } from './producto.page';

describe('ProductoPage', () => {
  let component: ProductoPage;
  let fixture: ComponentFixture<ProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
