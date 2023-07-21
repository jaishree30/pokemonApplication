import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PictureGridViewComponent } from './picture-grid-view.component';

describe('PictureGridViewComponent', () => {
  let component: PictureGridViewComponent;
  let fixture: ComponentFixture<PictureGridViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PictureGridViewComponent]
    });
    fixture = TestBed.createComponent(PictureGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
