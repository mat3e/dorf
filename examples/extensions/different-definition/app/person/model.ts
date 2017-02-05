import { IBackendDefinition } from './backend-definition';

import {
    DorfDomainObject,
    IDorfInputDefinition,
    DorfRadioDefinition,
    DorfInputDefinition,
    DorfSelectDefinition,
    PropertiesToDorfDefinitionsMap
} from 'dorf';

/**
 * Reactive Form will return set of properties, not a class with methods.
 * It's recommended to store those properties in the interface and use them in class.
 */
export interface IPerson {
    name: string;
    gender: string;
    cardCode: number;
    favColor: string;
}

/**
 * Domain Object, which we should get from the backend.
 */
export class Person {

    /**
     * In this case definition is almost the same thing as object itself.
     */
    static get fieldDefinitions() {
        return new this();
    }

    /*
    Example properties.
     */
    name: IBackendDefinition<string> = {
        label: 'Name',
        modifier: 'NotNull',
        value: null
    };
    gender: IBackendDefinition<string> = {
        label: 'Gender',
        modifier: 'NotNull',
        value: null,
        possibleValues: [{ key: 'm', value: 'male' }, { key: 'f', value: 'female' }]
    };
    cardCode: IBackendDefinition<number> = {
        label: 'Credit Card PIN',
        modifier: 'Hidden',
        value: null
    };
    favColor: IBackendDefinition<string> = {
        label: 'Favourite color',
        value: null,
        possibleValues: [{
            key: '#fff',
            value: 'white'
        }, {
            key: '#000',
            value: 'black'
        }, {
            key: '#ff0000',
            value: 'red'
        }, {
            key: '#00ff00',
            value: 'green'
        }, {
            key: '#0000ff',
            value: 'blue'
        }]
    };

    /**
     * Creation from the interface should be supported.
     */
    constructor(base: IPerson = null) {

        if (base) {
            this.name.value = base.name;
            this.gender.value = base.gender;
            this.cardCode.value = base.cardCode;
            this.favColor.value = base.favColor;
        }
    }
}
