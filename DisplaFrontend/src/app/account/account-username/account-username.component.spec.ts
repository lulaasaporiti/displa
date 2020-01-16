import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUsernameComponent } from './account-username.component';

describe('AccountUsernameComponent', () => {
  let component: AccountUsernameComponent;
  let fixture: ComponentFixture<AccountUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
