import { Component } from "@angular/core";

import { DorfConfigService } from "../dorf-config.service";
import {
    DorfTag,
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from "./abstract-dorf-field.component";

export type InputType = "color" | "date" | "datetime" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "range" | "search" | "tel" | "text" | "time" | "url" | "week";

/**
 * Each new component specifies its own definition interface.
 * Input field has to support HTML5 type.
 */
export interface IDorfInputDefinition<T> extends IDorfFieldDefinition<T> {
    type: InputType;
}

/**
 * Definition for the input field should point out the input type. All types from HTML5 are possible here.
 */
export class DorfInputDefinition<T> extends DorfFieldDefinition<T> implements IDorfInputDefinition<T> {

    private _type: InputType = "text";

    constructor(options?: IDorfInputDefinition<T>) {
        super(options);

        if (options) {
            this._type = options.type || this._type;
        }
    }

    get type() { return this._type; }

    get tag() { return DorfTag.INPUT; }
}

/**
 * Properties of the input field.
 */
export class DorfInputMetadata<T> extends DorfFieldMetadata<T, DorfInputDefinition<T>> implements IDorfInputDefinition<T> {

    constructor(definition = new DorfInputDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get type() { return this.definition.type }
}



/**
 * Input field which supports DorfSelectMetadata for rendering.
 */
@Component({
    moduleId: `${module.id}`,
    selector: "dorf-input",
    templateUrl: "./dorf-input.component.html"
})
export class DorfInputComponent<T> extends AbstractDorfFieldComponent<T, DorfInputMetadata<T>> implements IDorfInputDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get type() { return this.metadata.type; }
}