import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftbarComponent } from './leftbar.component';
import {TabComponent} from '../tab/tab.component';
import {FormComponent} from '../form/form.component';
import {FlightComponent} from '../flight/flight.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FlightService} from '../flight.service';


describe('LeftbarComponent', () => {
  let component: LeftbarComponent;
  let fixture: ComponentFixture<LeftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent, LeftbarComponent, TabComponent, FlightComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [FlightService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
