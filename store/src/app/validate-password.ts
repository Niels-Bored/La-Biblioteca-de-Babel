import { ValidatorFn, AbstractControl} from '@angular/forms';

export class ValidatePassword {
    static equalsValidator(otherControl: AbstractControl | null): ValidatorFn {
        return (control: AbstractControl): {[key: string]: boolean} | null => {
          const value: any = control.value;
          if(otherControl != null){
            const otherValue: any = otherControl.value;
            if(otherValue === value){
                return null;
            }else{
                return { 'notEquals': false };
            }
          }else{
            return null
          }
        };
      }
}
