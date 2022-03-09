import {FC, useState, useEffect, useCallback} from 'react';
import Select from 'react-select';
import {BaseComboBoxProps, BaseProps, ComboBoxOption, ReadonlyArrayOrItem} from './types';

export const isReadonlyArray = <A, B>(array: readonly A[] | B): array is readonly A[] =>
  Array.isArray(array);

const transformIdsToOptions = (
  value: number | null | undefined,
  options: ComboBoxOption[] | undefined
) => options?.find(({id}) => id === value);

const Combobox: FC<BaseComboBoxProps> = (props) => {
  const {value, defaultValue, options, textField, onChange: baseOnChange, ...rest} = props;

  const [internalValue, setInternalValue] = useState<
    ReadonlyArrayOrItem<ComboBoxOption> | null | undefined
  >(() => transformIdsToOptions(defaultValue, props.options));

  useEffect(() => {
    setInternalValue(transformIdsToOptions(value, options));
  }, [value, options]);

  const getOptionLabel: BaseProps['getOptionLabel'] = useCallback(
    (option: ComboBoxOption) => option[textField] as string,
    [textField]
  );

  const getOptionValue: BaseProps['getOptionValue'] = useCallback(
    (option: ComboBoxOption) => String(option.id),
    []
  );

  const onChange = useCallback(
    (option: ReadonlyArrayOrItem<ComboBoxOption> | null | undefined) => {
      setInternalValue(option);

      // HACK: somehow loses the accepted array arg type in the union
      (baseOnChange as (...args: unknown[]) => void)(
        isReadonlyArray(option) ? option.map((o) => o.id) : option?.id
      );
    },
    [baseOnChange]
  );

  return (
    <Select
      value={internalValue}
      onChange={onChange}
      options={options}
      isLoading={!options}
      isDisabled={!options}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      {...rest}
    />
  );
};

export default Combobox;
