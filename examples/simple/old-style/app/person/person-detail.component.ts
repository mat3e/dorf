import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PropertiesToDorfDefinitionsMap, AbstractDorfFormComponent, DorfConfigService } from 'dorf';

import { IPerson, Person } from './model';

/**
 * Lightweight class which creates a form.
 * Template provided from the library, but it is possible to prowide a custom one (which uses Dorf components).
 *
 * It's important to pass config in the constructor and define onSubmit method.
 */
@Component({
    moduleId: module.id,
    selector: 'person-details',
    // npm run prepare
    templateUrl: '../dorf-details.view.html'
})
export class PersonDetailComponent extends AbstractDorfFormComponent<Person> {
    @Input() domainObject: Person;
    @Output() createUpdate = new EventEmitter<IPerson>();

    // @Override
    protected get fieldDefinitions(): PropertiesToDorfDefinitionsMap<Person> {
        return Person.fieldDefinitions;
    }

    constructor(config: DorfConfigService) {
        super(config);
    }

    onSubmit() {
        let result = this.form.value as IPerson;

        // tslint:disable-next-line:no-console
        console.log(result);
        this.createUpdate.emit(result);
    }
}
