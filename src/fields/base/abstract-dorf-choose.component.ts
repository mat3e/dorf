import { OptionType, IDorfChooseDefinition, DorfChooseDefinition } from './abstract-dorf-choose.definition';
import { DorfChooseMetadata } from './abstract-dorf-choose.metadata';
import { AbstractDorfFieldComponent } from './abstract-dorf-field.component';

import { DorfConfigService } from '../../dorf-config.service';

/**
 * @whatItDoes Represents base [DorfFieldComponent]{@link AbstractDorfFieldComponent} for the fields with the limited values to choose from.
 *
 * @stable
 */
// tslint:disable-next-line:max-line-length
export abstract class DorfChooseComponent<T, M extends DorfChooseMetadata<T, DorfChooseDefinition<T>>> extends AbstractDorfFieldComponent<T, M> implements IDorfChooseDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get optionsToSelect() { return this.metadata.optionsToSelect; }
}