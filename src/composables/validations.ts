import { helpers, required } from '@vuelidate/validators';
import { isDateValid } from '../helpers/date';

export function useValidations() {
  const validateDateFormat = () => {
    return helpers.withMessage("Invalid date format", (value: string) => {
      return isDateValid(value);
    });
  };
  const validateRequired = (fieldName: string) => {
    return helpers.withMessage(`${fieldName} cannot be empty`, required)
  };


  return { validateDateFormat, validateRequired }
}