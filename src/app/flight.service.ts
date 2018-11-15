import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IFlight } from 'src/models/flight';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  searchResults: Subject<IFlight> = new Subject();
  activeTab: Subject<string> = new Subject();
  constructor(private http: Http) { }

  getFlights() {
    return this.http.get(`${environment.flightAPI}`);
  }
}
