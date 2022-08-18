import { helpers, required } from '@vuelidate/validators';
import { isDateValid } from '../helpers/date';
import { i18n } from '../locale/i18n'

const { t } = i18n.global

export function useValidations() {
  const validateDateFormat = () => {
    return helpers.withMessage(t('message.invalidDateFormat'), (value: string) => {
      return isDateValid(value);
    });
  };
  const validateRequired = (fieldName: string) => {
    return helpers.withMessage(`${t('message.field')} ${fieldName} ${t('message.notEmpty')}`, required)
  };


  return { validateDateFormat, validateRequired }
}