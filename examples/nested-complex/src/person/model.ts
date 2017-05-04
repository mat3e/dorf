import { Validators } from '@angular/forms';

import { DorfObject, DorfNestedObject, DorfInput, DorfRadio, DorfSelect, DorfCheckbox } from 'dorf';

import { IContactData, ContactData } from '../contact/model';

/**
 * Reactive Form will return set of properties, not a class with methods.
 * It's recommended to store those properties in the interface and use them in class.
 */
export interface IPerson {
    name: string;
    surname: string;
    gender: string;
    age: number;
    contact: IContactData;
}

/**
 * Domain Object.
 * Big part of the class is a standard definition - properties, getters, constructor (based on the interface).
 * Real additional job is when providing FieldDefinitions.
 */
@DorfObject()
export class Person implements IPerson {

    /*
    Example properties.
     */
    @DorfInput({
        label: 'Name', type: 'text',
        validator: Validators.required, errorMessage: 'Name is required'
    })
    name: string;

    @DorfInput({
        label: 'Surname', type: 'text',
        validator: Validators.required, errorMessage: 'Surname is required'
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

    @DorfNestedObject({ label: 'Contact', /*transparentFlow: true*/columnsNumber: 3 })
    contact: ContactData = new ContactData();

    /**
     * Shortcut for getting name and surname pair.
     */
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
            this.contact = new ContactData(base.contact);
        }
    }
}
