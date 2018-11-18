import {TestBed, getTestBed, inject} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {HttpParams} from '@angular/common/http';

import { FlightService } from './flight.service';
import { environment } from '../environments/environment';
import { IFlight } from '../models/flight';


describe('FlightService', () => {
  let injector;
  let service: FlightService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightService]
    });

    injector = getTestBed();
    service = injector.get(FlightService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('#getFlights API', () => {
    it('should return an Observable <any>', () => {
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

      service.getFlights().subscribe((response: any ) => {
        expect(response.length).toBe(2);
        expect(response).toEqual(mockFlights);
      });

      const req = httpMock.expectOne(`${environment.flightAPI}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockFlights);
    });
  });

});
