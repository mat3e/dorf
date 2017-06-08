import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { DorfConfigService } from '../../src/dorf-config.service';

import { DorfDomainObject } from '../../src/base/abstract-dorf.model'
import { PropertiesToDorfDefinitionsMap } from '../../src/base/dorf-mapper';
import { DorfInputDefinition } from '../../src/fields/dorf-input.definition';

import { DorfObject, DorfInput } from '../../src/decorators/dorf-object.decorator';
import { IDorfForm, DorfForm, DorfObjectInput } from '../../src/decorators/dorf-form.decorator';

/**
 * Plain old DorfDomainObject.
 */
export class Person1 extends DorfDomainObject {

    name: string;
    surname: string;

    constructor() {
        super();

        this.name = 'test';
        this.surname = 'test';
    }

    // @Override
    get fieldDefinitions(): PropertiesToDorfDefinitionsMap<Person1> {
        return {
            name: this.nameDef,
            surname: this.surnameDef
        };
    }

    private get nameDef(): DorfInputDefinition<string> {
        return new DorfInputDefinition({
            label: 'Name',
            type: 'text',
            updateModelOnChange: true,
            validator: Validators.required,
            errorMessage: 'Name is required'
        });
    }

    private get surnameDef(): DorfInputDefinition<string> {
        return new DorfInputDefinition({
            label: 'Surname',
            type: 'text',
            validator: Validators.required,
            errorMessage: 'Surname is required'
        });
    }
}

/**
 * New, sexy DorfObject.
 */
@DorfObject()
export class Person2 {
    @DorfInput({
        label: 'Name', type: 'text',
        updateModelOnChange: true,
        validator: Validators.required,
        errorMessage: 'Name is required'
    })
    name: string;

    @DorfInput({
        label: 'Surname', type: 'text',
        validator: Validators.required,
        errorMessage: 'Surname is required'
    })
    surname: string;

    constructor() {

        this.name = 'test';
        this.surname = 'test';
    }
}

/**
 * New form with an old-fashioned object.
 */
@DorfForm()
@Component({
    selector: 'person1-details'
})
export class Person1DetailComponent implements IDorfForm {
    @DorfObjectInput() domainObject: Person1;

    constructor(public config: DorfConfigService) { }

    onDorfSubmit() { }
    onDorfReset() { }
}

/**
 * New form with a new object.
 */
@DorfForm({
    renderFieldsetAroundFields: true,
    renderWithoutButtons: true
})
@Component({
    selector: 'person2-details'
})
export class Person2DetailComponent implements IDorfForm {
    @DorfObjectInput() domainObject: Person2;

    constructor(public config: DorfConfigService) { }
}
