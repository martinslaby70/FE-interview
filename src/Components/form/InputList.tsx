import {useMemo, ReactNode} from 'react';
import {UseFormReturn, FieldValues} from 'react-hook-form';

import {PartialFormContext, partialFormContext} from './contexts/partialForm';

type FormListProps = {
  children: ReactNode;
  className?: string;
};

// NOTE: react-hook-form is kinda unnecessary in project this small, but its keeps code looking clean & readable

const InputList = <FV extends FieldValues>({
  children,
  className,
  ...methods
}: FormListProps & UseFormReturn<FV>) => {
  const {control, register} = methods;

  const partialFormContextValue = useMemo(
    () => ({control, register} as PartialFormContext),
    [control, register]
  );
  return (
    <partialFormContext.Provider value={partialFormContextValue}>
      <div className={className}>{children}</div>
    </partialFormContext.Provider>
  );
};

export default InputList;
