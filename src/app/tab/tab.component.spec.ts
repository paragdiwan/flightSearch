import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';
import {FlightService} from '../flight.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabComponent ],
      providers: [FlightService],
      imports: [
        HttpClientModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
