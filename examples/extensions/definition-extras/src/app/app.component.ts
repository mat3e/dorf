import { Component } from '@angular/core';

import { IPerson, Person } from './person/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeIndex = -1;
  activePerson = new Person();

  people: Person[] = [];

  onClick(index: number) {
    this.activeIndex = index;
    this.activePerson = this.people[index];
  }

  onCreateUpdate(person: IPerson) {
    this.activeIndex >= 0 ? this.people[this.activeIndex] = new Person(person)
      : this.people.push(new Person(person));

    this.reset();
  }

  private reset() {
    this.activeIndex = -1;
    this.activePerson = new Person();
  }
}
