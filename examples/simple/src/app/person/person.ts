import { Validators } from '@angular/forms';

import { DorfObject, DorfInput, DorfRadio, DorfSelect, DorfCheckbox } from 'dorf';

/**
 * Contract.
 */
export interface IPerson {
    name: string;
    surname: string;
    gender: string;
    age: number;
    cardCode: number;
    favColor: string;
    smart: string;
}

/**
 * Implementation, DORF in action!
 * Each property is annotated to support DORF form generation.
 */
@DorfObject()
export class Person implements IPerson {

    @DorfInput({
        label: 'Name', type: 'text',
        validator: Validators.required, errorMessage: 'Name is required',
        updateModelOnChange: true
    })
    name: string;

    @DorfInput({
        label: 'Surname', type: 'text',
        validator: Validators.required, errorMessage: 'Surname is required',
        debounce: 1000,
        updateModelOnChange: true
    })
    surname: string;

    @DorfRadio({
        label: 'Gender',
        optionsToSelect: [{ key: 'm', value: 'male' }, { key: 'f', value: 'female' }],
        validator: Validators.required, errorMessage: 'Gender is required'
    })
    gender: string;

    @DorfInput({ label: 'Age', type: 'number' })
    age: number;

    @DorfInput({
        label: 'Credit card PIN', type: 'password',
        debounce: 1000,
        validator: Validators.pattern('[0-9]{4}'), errorMessage: 'PIN should contain just 4 digits'
    })
    cardCode: number;

    @DorfSelect({
        label: 'Favourite color',
        optionsToSelect: [
            { key: '#fff', value: 'white' },
            { key: '#000', value: 'black' },
            { key: '#ff0000', value: 'red' },
            { key: '#00ff00', value: 'green' },
            { key: '#0000ff', value: 'blue' }
        ]
    })
    favColor: string;

    @DorfCheckbox({
        label: 'Is smart?',
        mapping: { trueValue: 'yes', falseValue: 'no' }
    })
    smart: string;

    get fullname() {
        return this.name + ' ' + this.surname;
    }

    /**
     * Creation from the interface should be supported.
     */
    constructor(base: IPerson = null) {
        if (base) {
            this.name = base.name;
            this.surname = base.surname;
            this.gender = base.gender;
            this.age = base.age;
            this.cardCode = base.cardCode;
            this.favColor = base.favColor;
            this.smart = base.smart;
        }
    }
}
