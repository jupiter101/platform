// tslint:disable:no-trailing-whitespace
// tslint:disable:no-inferrable-types
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

export type EmailBlackList = string[];

function validateEmailFactory(emailBlackList: EmailBlackList) {
  return (c: FormControl) => {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return EMAIL_REGEXP.test(c.value)
      ? null
      : {
          validateEmail: {
            valid: false,
          },
        };
  };
}

/**
 *
 * @see https://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
 */
@Directive({
  selector: '[cn-validateEmail][ngModel],[validateEmail][formControl]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailValidatorDirective),
      multi: true,
    },
  ],
})
export class EmailValidatorDirective {
  validator: Function;

  constructor(emailBlackList: EmailBlackList) {
    this.validator = validateEmailFactory(emailBlackList);
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
