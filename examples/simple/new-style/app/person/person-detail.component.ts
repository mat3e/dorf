import { Component, Output, EventEmitter } from '@angular/core';
import { DorfConfigService, IDorfForm, DorfObjectInput, DorfForm } from 'dorf';

import { IPerson, Person } from './model';

/**
 * Lightweight class which creates a form.
 * Template provided from the library, but it is possible to provide a custom one (which uses Dorf components).
 *
 * It's important to pass config in the constructor and define onSubmit method.
 */
@DorfForm()
@Component({
    moduleId: module.id,
    selector: 'person-details'
})
export class PersonDetailComponent implements IDorfForm {
    @DorfObjectInput() domainObject: Person;
    @Output() createUpdate = new EventEmitter<IPerson>();

    constructor(public config: DorfConfigService) { }

    onDorfSubmit() {
        let result = this['form'].value as IPerson;

        console.log(result);
        this.createUpdate.emit(result);
    }
}
