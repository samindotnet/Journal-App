import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddJournalPage } from './add-journal.page';

describe('AddJournalPage', () => {
  let component: AddJournalPage;
  let fixture: ComponentFixture<AddJournalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJournalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
