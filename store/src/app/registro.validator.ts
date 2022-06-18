import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const contrasenasConfirm: ValidatorFn=(
    control : AbstractControl
): ValidationErrors|null =>{
    const pass_1= control.get('pass_1')
    const pass_2= control.get('pass_2')

    return pass_1?.value === pass_2?.value
        ? null
        : {noSonIguales:true}
}