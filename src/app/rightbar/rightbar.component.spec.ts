import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightbarComponent } from './rightbar.component';
import {ResultComponent} from '../result/result.component';
import {FlightComponent} from '../flight/flight.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlightService} from '../flight.service';

describe('RightbarComponent', () => {
  let component: RightbarComponent;
  let fixture: ComponentFixture<RightbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightbarComponent, ResultComponent, FlightComponent ],
      imports: [FormsModule, HttpClientModule],
      providers: [FlightService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
