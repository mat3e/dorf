import { Component } from "@angular/core";

import { DorfService } from "./dorf.service";
import {
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from "./abstract-dorf-field.component";

/**
 * Each new component specifies its own definition interface.
 * Input field has to support HTML5 type.
 */
export interface IDorfInputDefinition extends IDorfFieldDefinition {
    // FIXME: type => enum
    type: string;
}

/**
 * Definition for the input field should point out the input type. All types from HTML5 are possible here.
 */
export class DorfInputDefinition<T> extends DorfFieldDefinition<T> implements IDorfInputDefinition {

    private _type = "text";

    constructor(options?: IDorfInputDefinition) {
        super(options);

        if (options) {
            this._type = options.type;
        }
    }

    get tag() { return "input"; }

    get type() { return this._type; }
}

/**
 * Properties of the input field.
 */
export class DorfInputMetadata<T> extends DorfFieldMetadata<T> implements IDorfInputDefinition {

    constructor(definition: DorfInputDefinition<T>, options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get type() { return (this._definition as DorfInputDefinition<T>).type }
}



/**
 * Input field which supports DorfSelectMetadata for rendering.
 */
@Component({
    moduleId: module.id,
    selector: "dorf-input",
    templateUrl: "dorf-input.component.html"
})
export class DorfInputComponent<T> extends AbstractDorfFieldComponent<T> implements IDorfInputDefinition {

    constructor(public config: DorfService) {
        super();
    }

    get type() { return (this.metadata as DorfInputMetadata<T>).type; }
}