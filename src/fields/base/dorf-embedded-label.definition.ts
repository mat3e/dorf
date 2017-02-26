import { IDorfFieldDefinition } from './dorf-field.definition';

export function supportEmbeddedLabel<T>(options: IDorfFieldDefinition<T>): IDorfFieldDefinition<T> {
    options = options || {};
    options.extras = options.extras || {};
    options.extras.embeddedLabel = true;

    return options;
}