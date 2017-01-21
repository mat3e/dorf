import { IDorfFieldDefinition } from "dorf";

/**
 * Example validations. Each one should be mapped separately.
 */
export type Modifier = "NotNull" | "Hidden";

/**
 * Totally different FieldDefinition, which comes from the server.
 */
export interface IBackendDefinition<T> {
    label?: string;
    modifier?: Modifier;
    value: T;
    possibleValues?: { key: any, value: string }[];
}