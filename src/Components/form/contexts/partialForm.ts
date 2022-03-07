import {createContext, useContext} from 'react';
import {UseFormReturn, FieldValues} from 'react-hook-form';

export type PartialFormContext<FV extends FieldValues = FieldValues> = Pick<
  UseFormReturn<FV>,
  'register' | 'control'
>;

export const partialFormContext = createContext<PartialFormContext | undefined>(undefined);

partialFormContext.displayName = 'partialFormContext';

export const usePartialFormContext = <FV extends FieldValues>() => {
  const ctx = useContext(partialFormContext);
  if (!ctx) throw new Error('Place FormInput inside InputList');

  return ctx as PartialFormContext<FV>;
};
