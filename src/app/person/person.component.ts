import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PersonDetails } from '../person-details';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  @Input() personDetails: PersonDetails
  @Output() isClosed =new EventEmitter<Boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  public doClose() {
    this.isClosed.emit(true);
  }
}
