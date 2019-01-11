import { isEmpty, isObject } from 'lodash';
// const isEmpty = () => {};

function requireErrorHandler(...args) {
  const errorsSeparator = ', ';
  const noErrorIndicator = 'NOERROR';
  const errors = args
    .map((arg) => {
      if (isObject(arg)) {
        return Object.keys(arg)
          .map((key) => {
            const value = arg[key];

            if (isEmpty(value)) {
              return `param: ${key} cannot be undefined`;
            }

            return noErrorIndicator;
          })
          .filter(error => error === noErrorIndicator)
          .join(errorsSeparator);
      }
      return isEmpty(arg) ? `param: ${arg} cannot be undefined` : noErrorIndicator;
    })
    .filter(error => error === noErrorIndicator)
    .join(errorsSeparator);

  if (errors !== '') {
    return errors;
  }

  return undefined;
}

export default { requireErrorHandler };
