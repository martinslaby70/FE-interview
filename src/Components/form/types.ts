import type {Props as SelectProps} from 'react-select';

export type Variant = 'Combobox' | 'text' | 'textarea';

type Empty = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComboboxOption = {id: string; [key: string]: any};

export type BaseProps = SelectProps<ComboboxOption, boolean>;

export type BaseComboboxProps = {
  value: number;
  defaultValue?: number;
  onChange: (id: number | null) => void;
  placeholder: string;
  textField: string;
  options: ComboboxOption[] | undefined;
} & Pick<BaseProps, 'isClearable' | 'isSearchable' | 'isDisabled' | 'className'>;

type ComboboxProps = Omit<
  BaseComboboxProps,
  'valueField' | 'value' | 'onChange' | 'placeholder' | 'isMulti' | 'isDisabled'
> &
  Partial<BaseComboboxProps>;

export type VariantInputMap = {
  Combobox: ComboboxProps;
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
