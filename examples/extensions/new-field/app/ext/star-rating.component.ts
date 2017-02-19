import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
    DorfTag,
    DorfConfigService,
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from 'dorf';

export interface IStarRatingDefinition extends IDorfFieldDefinition<number> {
    max: number;
}

export class StarRatingDefinition extends DorfFieldDefinition<number> implements IStarRatingDefinition {
    static get TAG() {
        return 'star-rating';
    }

    private _max: number = 5;

    constructor(options?: IStarRatingDefinition) {
        super(options);

        if (options) {
            this._max = options.max > 1 ? options.max : this._max;
        }
    }

    get max() { return this._max; }

    get tag() { return StarRatingDefinition.TAG; }
}

export class StarRatingMetadata extends DorfFieldMetadata<number, StarRatingDefinition> implements IStarRatingDefinition {
    constructor(definition = new StarRatingDefinition(), options?: IDorfFieldMetadata<number>) {
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
export class StarRatingComponent extends AbstractDorfFieldComponent<number, StarRatingMetadata> implements IStarRatingDefinition {

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

export const STAR_TAG: DorfTag<typeof StarRatingDefinition, typeof StarRatingMetadata> = {
    tag: StarRatingDefinition.TAG,
    definition: StarRatingDefinition,
    metadata: StarRatingMetadata
}
