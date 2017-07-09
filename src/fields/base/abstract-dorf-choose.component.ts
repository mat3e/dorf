import { OptionType, IDorfChooseDefinition } from './abstract-dorf-choose.definition';
import { DorfChooseMetadata } from './abstract-dorf-choose.metadata';
import { AbstractDorfFieldComponent } from './abstract-dorf-field.component';

import { DorfConfigService } from '../../dorf-config.service';

/**
 * Represents base [DorfFieldComponent]{@link AbstractDorfFieldComponent} for the fields with the limited values to choose from.
 *
 * @stable
 */
// tslint:disable-next-line:max-line-length
export abstract class DorfChooseComponent<T, M extends DorfChooseMetadata<T, IDorfChooseDefinition<T>>> extends AbstractDorfFieldComponent<T, M> {

    /** @inheritdoc */
    constructor(config: DorfConfigService) {
        super(config);
    }

    /** @inheritdoc */
    get optionsToSelect() { return this.metadata.optionsToSelect; }
}
