import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.scss']
})
export class RightbarComponent implements OnInit {
  @Input() flights;
  @Input() searchResult;
  constructor() { }

  ngOnInit() {
    console.log('Inside child controller');
    console.log(this.flights);
  }

}
