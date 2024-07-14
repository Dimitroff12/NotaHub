import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalsPage } from './journals.page';

describe('JournalsPage', () => {
  let component: JournalsPage;
  let fixture: ComponentFixture<JournalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JournalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
