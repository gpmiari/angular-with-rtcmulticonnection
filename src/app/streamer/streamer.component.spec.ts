import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamerComponent } from './streamer.component';

describe('StreamerComponent', () => {
  let component: StreamerComponent;
  let fixture: ComponentFixture<StreamerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
