import { Component, Output, EventEmitter } from '@angular/core';
import { DorfConfigService, IDorfForm, DorfObjectInput, DorfForm } from 'dorf';

import { IPerson, Person } from './person';

@DorfForm()
@Component({
  selector: 'app-person-details'
})
export class PersonDetailComponent {
  @DorfObjectInput() domainObject: Person;
  @Output() createUpdate = new EventEmitter<IPerson>();

  constructor(public config: DorfConfigService) { }

  onDorfSubmit() {
    const result = this['form'].value as IPerson;

    console.log(result);
    this.createUpdate.emit(result);
  }
}
