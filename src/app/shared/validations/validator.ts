import { AbstractControl } from '@angular/forms';

const pureEmail =
  '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';

export const regexValidators = {
  phone: '[+][0-9() ]{7,}$',
  email: pureEmail,
};

export function confPassValidation(control: AbstractControl) {
  if (control && control.value !== null && control.value !== undefined) {
    const confPassword = control.value;
    const passwordControl = control.root.get('password');
    if (passwordControl) {
      const password = passwordControl.value;
      if (password !== confPassword) {
        return {
          isError: true,
        };
      }
    }
  }
  return null;
}
