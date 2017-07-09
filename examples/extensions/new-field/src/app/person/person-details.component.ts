import { Component, Output, EventEmitter } from '@angular/core';
import { PropertiesToDorfDefinitionsMap, IDorfForm, DorfForm, DorfObjectInput, DorfConfigService } from 'dorf';

import { IPerson, Person } from './model';
import { STAR_RATING } from '../ext/star-rating.component';

/**
 * Lightweight class which creates a form.
 * Template provided from the library, but it is possible to provide a custom one (which uses Dorf components).
 *
 * It's important to pass config in the constructor and define onDorfSubmit method.
 */
@DorfForm({
    additionalTags: [STAR_RATING] // array of the selectors of the fields we want to render
})
@Component({
    moduleId: module.id,
    selector: 'app-person-details'
})
export class PersonDetailsComponent implements IDorfForm {
    @DorfObjectInput() domainObject: Person;
    @Output() createUpdate = new EventEmitter<IPerson>();

    constructor(public config: DorfConfigService) { }

    onDorfSubmit() {
        let result = this['form'].value as IPerson;

        console.log(result);
        this.createUpdate.emit(result);
    }
}
