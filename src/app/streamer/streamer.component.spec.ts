import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { StreamerComponent } from './streamer.component';

describe('StreamerComponent', () => {
  let component: StreamerComponent;
  let fixture: ComponentFixture<StreamerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamerComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
