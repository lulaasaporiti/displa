import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaDebitoConfirmarComponent } from './nota-debito-confirmar.component';


describe('NotaDebitoConfirmarComponent', () => {
  let component: NotaDebitoConfirmarComponent;
  let fixture: ComponentFixture<NotaDebitoConfirmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaDebitoConfirmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaDebitoConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
