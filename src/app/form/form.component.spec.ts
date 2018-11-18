import { async, ComponentFixture, getTestBed, inject, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../flight.service';
import { HttpClientModule } from '@angular/common/http';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let service;
  let injector;
  const mockFlights = [
    {
      'arrivalTime': '9:00AM',
      'departureCity': 'Kolkatta',
      'departureTime': '7:00AM',
      'destinationCity': 'Delhi',
      'fair': {
        'adult': 10000,
        'child': 4343,
        'infant': 1000,
        'totalFair': 0
      },
      'flightClass': 'business',
      'flightDepartureDate': '2018-11-17',
      'flightId': '0121012',
      'flightName': 'AI1991'
    }, {
      'arrivalTime': '2:30PM',
      'departureCity': 'Delhi',
      'departureTime': '11:00AM',
      'destinationCity': 'Kolkatta',
      'fair': {
        'adult': 1020,
        'child': 400,
        'infant': 100,
        'totalFair': 0
      },
      'flightClass': 'business',
      'flightDepartureDate': '2018-11-24',
      'flightId': '1212121',
      'flightName': 'JW1991'
    }];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule
      ],
      providers: [FlightService]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    service = injector.get(FlightService);
    fixture.detectChanges(); // initial detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.sourceCity = 'delhi';
    component.destinationCity = 'mumbai';
    component.adults = 1;
    component.departureDate = '22/12/2019';
    component.findFlights();
    fixture.detectChanges();
    spyOn(service, 'getFlights').and.returnValue(mockFlights);
  });
});
