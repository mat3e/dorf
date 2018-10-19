import { Component, EventEmitter, Output } from '@angular/core';
import { DorfConfigService, DorfForm, DorfMapper, DorfObjectInput, IDorfForm } from 'dorf';

import { CustomMapper } from '../ext/custom-mapper';
import { IPerson, Person } from './model';

/**
 * Lightweight class which creates a form.
 * Template provided from the library, but it is possible to prowide a custom one (which uses Dorf components).
 *
 * It's important to pass config in the constructor and define onDorfSubmit method.
 */
@DorfForm()
@Component({
    selector: 'app-person-details'
})
export class PersonDetailsComponent implements IDorfForm {
    _mapper: DorfMapper;

    @DorfObjectInput() domainObject: Person;
    @Output() createUpdate = new EventEmitter<IPerson>();

    constructor(public config: DorfConfigService) {
        this._mapper = new CustomMapper(config);
    }

    onDorfSubmit() {
        const result = this['form'].value as IPerson;

        console.log(result);
        this.createUpdate.emit(result);
    }
}
