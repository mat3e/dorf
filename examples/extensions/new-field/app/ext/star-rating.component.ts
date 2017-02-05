import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
    DorfConfigService,
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from 'dorf';

export interface IStarRatingDefinition<T> extends IDorfFieldDefinition<T> {
    max: number;
}

export class StarRatingDefinition<T> extends DorfFieldDefinition<T> implements IStarRatingDefinition<T> {
    static get TAG() {
        return 'star-rating';
    }

    private _max = 5;

    constructor(options?: IStarRatingDefinition<T>) {
        super(options);

        if (options) {
            this._max = options.max > 1 ? options.max : this._max;
        }
    }

    get max() { return this._max; }

    get tag() { return StarRatingDefinition.TAG; }
}

export class StarRatingMetadata<T> extends DorfFieldMetadata<T, StarRatingDefinition<T>> implements IStarRatingDefinition<T> {
    constructor(definition = new StarRatingDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get max() { return this.definition.max; }
}

@Component({
    moduleId: module.id,
    selector: StarRatingDefinition.TAG,
    styleUrls: ['star-rating.component.css'],
    templateUrl: 'star-rating.component.html'
})
export class StarRatingComponent<T> extends AbstractDorfFieldComponent<T, StarRatingMetadata<T>> implements IStarRatingDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    setValue(val: number) {
        // 1 more than array index
        this.formControl.setValue(val + 1);
    }

    get max() { return this.metadata.max; }

    get stars() { return new Array(this.max); }
    get value() { return this.formControl.value; }
}
