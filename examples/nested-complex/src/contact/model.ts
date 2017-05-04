import { Validators } from '@angular/forms';

import { DorfObject, DorfNestedObject, DorfInput } from 'dorf';

import { IAddress, Address } from '../address/model';

/**
 * Contract for creating contact data.
 */
export interface IContactData {
    phone: string;
    mail: string;
    address: IAddress;
}

/**
 * Nested Domain Object.
 */
@DorfObject()
export class ContactData implements IContactData {

    @DorfInput({
        label: 'E-mail', type: 'email',
        validator: Validators.email, errorMessage: 'Only correct e-mails allowed'
    })
    mail: string;

    @DorfInput({
        label: 'Phone', type: 'text',
        validator: Validators.pattern('[0-9]{9}'), errorMessage: 'Phone should contain exactly 9 digits'
    })
    phone: string;

    @DorfNestedObject({ transparentFlow: true })
    address: Address = new Address();

    /**
     * Creation from the interface should be supported.
     */
    constructor(base: IContactData = null) {
        if (base) {
            this.mail = base.mail;
            this.phone = base.phone;
            this.address = new Address(base.address);
        }
    }
}
