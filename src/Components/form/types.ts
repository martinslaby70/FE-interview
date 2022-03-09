import type {Props, StylesConfig} from 'react-select';
import {ItemWithId} from 'screens/sections/utils';

export type Variant = 'ComboBox' | 'text' | 'textarea';

type Empty = Record<string, unknown>;

export type ComboBoxOption = ItemWithId;

export type BaseProps = Props<ComboBoxOption, boolean>;

export type BaseComboBoxProps = {
  value: number;
  defaultValue?: number;
  onChange: (id: number | null) => void;
  placeholder: string;
  textField: string;
  options: ComboBoxOption[] | undefined;
  styles: StylesConfig<ComboBoxOption>;
} & Pick<BaseProps, 'isClearable' | 'isSearchable' | 'isDisabled' | 'className'>;

type ComboBoxProps = Omit<
  BaseComboBoxProps,
  'valueField' | 'value' | 'onChange' | 'placeholder' | 'isMulti' | 'isDisabled'
> &
  Partial<BaseComboBoxProps>;

export type VariantInputMap = {
  ComboBox: ComboBoxProps;
  text: Empty;
  textarea: Empty;
};

type Variants = keyof VariantInputMap;

type SharedFormInputProps = {
  className?: string;
  title?: string;
  required?: boolean;
  variant: Variants;
  placeholder?: string;
  name: string;
};

export type FormInputProps = {
  [V in Variants]: VariantInputMap[V] &
    SharedFormInputProps & {
      defaultValue?: VariantInputMap[V]['defaultValue'] | null;
    };
}[keyof VariantInputMap];

export type ReadonlyArrayOrItem<A> = readonly A[] | A;
