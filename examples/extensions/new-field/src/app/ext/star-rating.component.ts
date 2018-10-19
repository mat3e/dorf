import { Component } from '@angular/core';

import {
  AbstractDorfFieldComponent,
  DorfConfigService,
  DorfFieldDefinition,
  DorfFieldMetadata,
  IDorfField,
  IDorfFieldDefinition,
  IDorfFieldMetadata
} from 'dorf';

const TAG = 'star-rating';

export interface IStarRatingDefinition extends IDorfFieldDefinition<number> {
    max: number;
}

export class StarRatingDefinition extends DorfFieldDefinition<number> implements IStarRatingDefinition {
    static get TAG() {
        return TAG;
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
    selector: TAG,
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

export const STAR_RATING: IDorfField<typeof StarRatingDefinition, typeof StarRatingMetadata> = {
    tag: TAG,
    definition: StarRatingDefinition,
    metadata: StarRatingMetadata
};
