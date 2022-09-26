import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIssueComponent } from './edit-person.component';

describe('EditPersonComponent', () => {
  let component: EditIssueComponent;
  let fixture: ComponentFixture<EditPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
