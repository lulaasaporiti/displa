import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoLibreComponent } from './producto-libre.component';


describe('ProductoLibreComponent', () => {
  let component: ProductoLibreComponent;
  let fixture: ComponentFixture<ProductoLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
