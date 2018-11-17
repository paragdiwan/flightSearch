import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  searchResults: Subject<[Object, any[]]> = new Subject();
  activeTab: Subject<string> = new Subject();
  constructor(private http: HttpClient ) { }

  getFlights() {
    return this.http.get(`${environment.flightAPI}`);
  }
}
