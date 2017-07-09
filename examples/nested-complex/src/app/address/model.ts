import { Validators } from '@angular/forms';

import { DorfObject, DorfInput } from 'dorf';

/**
 * Contract for creating an address.
 */
export interface IAddress {
    street: string;
    housenumber: string; // 3A or something
    doornumber: number;
}

/**
 * Nested Domain Object.
 */
@DorfObject()
export class Address implements IAddress {

    @DorfInput({
        label: 'Street', type: 'text',
        validator: Validators.required, errorMessage: 'Street is required'
    })
    street: string;

    @DorfInput({
        label: 'House number', type: 'text',
        validator: Validators.required, errorMessage: 'House number is required'
    })
    housenumber: string;

    @DorfInput({
        label: 'Door number', type: 'text',
        validator: Validators.pattern('[0-9]+'), errorMessage: 'Only numbers allowed'
    })
    doornumber: number;

    /**
     * Creation from the interface should be supported.
     */
    constructor(base: IAddress = null) {
        if (base) {
            this.street = base.street;
            this.housenumber = base.housenumber;
            this.doornumber = base.doornumber;
        }
    }
}
