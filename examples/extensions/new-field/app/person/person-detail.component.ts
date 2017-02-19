import { Component, Output, EventEmitter } from '@angular/core';
import { PropertiesToDorfDefinitionsMap, IDorfForm, DorfForm, DorfObjectInput, DorfConfigService } from 'dorf';

import { IPerson, Person } from './model';
import { STAR_TAG } from '../ext/star-rating.component';

/**
 * Lightweight class which creates a form.
 * Template provided from the library, but it is possible to prowide a custom one (which uses Dorf components).
 *
 * It's important to pass config in the constructor and define onSubmit method.
 */
@DorfForm({
    additionalTags: [STAR_TAG]
})
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
