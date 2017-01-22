import { Validators } from "@angular/forms";

import { DorfObject, DorfInput, DorfRadio, DorfSelect, DorfCheckbox } from "dorf";

/**
 * Reactive Form will return set of properties, not a class with methods.
 * It's recommended to store those properties in the interface and use them in class.
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
 * Domain Object. 
 * Big part of the class is a standard definition - properties, getters, constructor (based on the interface).
 * Real additional job is when providing FieldDefinitions.
 */
@DorfObject()
export class Person implements IPerson {

    /* 
    Example properties.
     */
    @DorfInput<string>({
        label: "Name", type: "text",
        validator: Validators.required, errorMessage: "Name is required",
        updateModelOnChange: true
    })
    name: string;

    @DorfInput<string>({
        label: "Surname", type: "text",
        validator: Validators.required, errorMessage: "Surname is required"
    })
    surname: string;

    @DorfRadio<string>({
        label: "Gender",
        optionsToSelect: [{ key: "m", value: "male" }, { key: "f", value: "female" }],
        validator: Validators.required, errorMessage: "Gender is required"
    })
    gender: string;

    @DorfInput<number>({ label: "Age", type: "number" })
    age: number;

    @DorfInput<number>({
        label: "Credit card PIN", type: "password",
        validator: Validators.pattern("[0-9]{4}"), errorMessage: "PIN should contain just 4 digits"
    })
    cardCode: number;

    @DorfSelect({
        label: "Favourite color",
        optionsToSelect: [
            { key: "#fff", value: "white" },
            { key: "#000", value: "black" },
            { key: "#ff0000", value: "red" },
            { key: "#00ff00", value: "green" },
            { key: "#0000ff", value: "blue" }
        ]
    })
    favColor: string;

    @DorfCheckbox<string>({
        label: "Is smart?",
        mapping: { trueValue: "yes", falseValue: "no" }
    })
    smart: string;

    /**
     * Shortcut for getting name and surname pair.
     */
    get fullname() {
        return this.name + " " + this.surname;
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