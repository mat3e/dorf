import { Validators } from "@angular/forms";

import {
    DorfDomainObject,
    IDorfInputDefinition,
    DorfRadioDefinition,
    DorfInputDefinition,
    DorfSelectDefinition,
    DorfCheckboxDefinition,
    PropertiesToDorfDefinitionsMap
} from "dorf";

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
    gender: string;
    age: number;
    cardCode: number;
    favColor: string;
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
        super();

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

    // @Override
    get fieldDefinitions(): PropertiesToDorfDefinitionsMap<Person> {
        return {
            "name": this.nameDef,
            "surname": this.surnameDef,
            "gender": this.genderDef,
            "age": this.ageDef,
            "cardCode": this.cardCodeDef,
            "favColor": this.favColorDef,
            "smart": this.smartDef
        };
    }

    /*
    Example definitions. 
    It's more readable to store them in getters.
     */
    private get nameDef(): DorfInputDefinition<string> {
        return new DorfInputDefinition({
            label: "Name",
            type: "text",
            validator: Validators.required,
            errorMessage: "Name is required",
            extras: {
                placeholder: "Name...",
                order: 2
            }
        });
    }

    private get surnameDef(): DorfInputDefinition<string> {
        return new DorfInputDefinition({
            label: "Surname",
            type: "text",
            validator: Validators.required,
            errorMessage: "Surname is required",
            extras: {
                order: 1
            }
        });
    }

    private get genderDef(): DorfRadioDefinition<string> {
        return new DorfRadioDefinition({
            label: "Gender",
            optionsToSelect: [{
                key: "m",
                value: "male"
            }, {
                key: "f",
                value: "female"
            }],
            validator: Validators.required,
            errorMessage: "Gender is required",
            extras: {
                order: 5
            }
        });
    }

    private get ageDef(): DorfInputDefinition<number> {
        return new DorfInputDefinition({
            label: "Age",
            type: "number",
            extras: {
                placeholder: "18 years or not?",
                order: 3
            }
        });
    }

    private get cardCodeDef(): DorfInputDefinition<number> {
        return new DorfInputDefinition({
            label: "Credit card PIN",
            type: "password",
            validator: Validators.pattern("[0-9]{4}"),
            errorMessage: "PIN should contain just 4 digits",
            extras: {
                order: 4
            }
        });
    }

    private get favColorDef(): DorfSelectDefinition<string> {
        return new DorfSelectDefinition({
            label: "Favourite color",
            optionsToSelect: [{
                key: "#fff",
                value: "white"
            }, {
                key: "#000",
                value: "black"
            }, {
                key: "#ff0000",
                value: "red"
            }, {
                key: "#00ff00",
                value: "green"
            }, {
                key: "#0000ff",
                value: "blue"
            }],
            extras: {
                order: 6
            }
        });
    }

    private get smartDef(): DorfCheckboxDefinition<string> {
        return new DorfCheckboxDefinition<string>({
            label: "Is smart?",
            mapping: {
                trueValue: "yes",
                falseValue: "no"
            }
            extras: {
                order: 0
            }
        })
    }
}