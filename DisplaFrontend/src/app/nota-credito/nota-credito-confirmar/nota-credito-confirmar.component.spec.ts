import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaCreditoConfirmarComponent } from './nota-credito-confirmar.component';


describe('NotaCreditoConfirmarComponent', () => {
  let component: NotaCreditoConfirmarComponent;
  let fixture: ComponentFixture<NotaCreditoConfirmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaCreditoConfirmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaCreditoConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
