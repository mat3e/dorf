import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PropertiesToDorfDefinitionsMap, AbstractDorfDetailsComponent, DorfConfigService } from "dorf";

import { CustomMapper } from '../ext/custom-mapper';
import { IPerson, Person } from "./model";

/**
 * Lightweight class which creates a form. 
 * Template provided from the library, but it is possible to prowide a custom one (which uses Dorf components).
 * 
 * It's important to pass config in the constructor and define onSubmit method.
 */
@Component({
    moduleId: module.id,
    selector: "person-details",
    // npm run prepare
    templateUrl: "../dorf-details.view.html"
})
export class PersonDetailComponent extends AbstractDorfDetailsComponent<Person> {
    @Input() domainObject: Person;
    @Output() createUpdate = new EventEmitter<IPerson>();

    // @Override
    protected get fieldDefinitions(): PropertiesToDorfDefinitionsMap<Person> {
        // casting, because properties are not identical
        return Person.fieldDefinitions as any;
    }

    constructor(config: DorfConfigService) {
        super(config, new CustomMapper(config));
    }

    onSubmit() {
        let result = this.form.value as IPerson;

        console.log(result);
        this.createUpdate.emit(result);
    }
}