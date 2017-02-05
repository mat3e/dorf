import { Validators } from '@angular/forms';

import {
    DorfDomainObject,
    IDorfInputDefinition,
    DorfRadioDefinition,
    DorfInputDefinition,
    DorfSelectDefinition,
    PropertiesToDorfDefinitionsMap
} from 'dorf';

import { StarRatingDefinition } from '../ext/star-rating.component';

/**
 * Reactive Form will return set of properties, not a class with methods.
 * It's recommended to store those properties in the interface and use them in class.
 */
export interface IPerson {
    name: string;
    surname: string;
    rating: number;
}

/**
 * Domain Object. 
 * Big part of the class is a standard definition - properties, getters, constructor (based on the interface).
 * Real additional job is when providing FieldDefinitions.
 */
export class Person extends DorfDomainObject implements IPerson {

    /**
     * Definition is class specific in most cases, 
     * so it's more meaningful to have it as a static property/function.
     */
    static get fieldDefinitions() {
        return new this().fieldDefinitions;
    }

    /* 
    Example properties.
     */
    name: string;
    surname: string;
    rating: number;

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
        super();

        if (base) {
            this.name = base.name;
            this.surname = base.surname;
            this.rating = base.rating;
        }
    }

    // @Override
    get fieldDefinitions(): PropertiesToDorfDefinitionsMap<Person> {
        return {
            name: this.nameDef,
            surname: this.surnameDef,
            rating: this.ratingDef
        };
    }

    /*
    Example definitions. 
    It's more readable to store them in getters.
     */
    private get nameDef(): DorfInputDefinition<string> {
        return new DorfInputDefinition({
            label: 'Name',
            type: 'text',
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

    private get ratingDef(): StarRatingDefinition<number> {
        return new StarRatingDefinition({
            label: 'Rating',
            max: 7
        });
    }
}
