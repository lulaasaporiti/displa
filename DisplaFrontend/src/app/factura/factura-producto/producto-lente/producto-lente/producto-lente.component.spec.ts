import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoLenteComponent } from './producto-lente.component';


describe('ProductoLenteComponentv', () => {
  let component: ProductoLenteComponent;
  let fixture: ComponentFixture<ProductoLenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoLenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoLenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
