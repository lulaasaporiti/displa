import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionParametrosComponent } from './modificacion-parametros.component';


describe('ModificacionParametrosComponent', () => {
  let component: ModificacionParametrosComponent;
  let fixture: ComponentFixture<ModificacionParametrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionParametrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
