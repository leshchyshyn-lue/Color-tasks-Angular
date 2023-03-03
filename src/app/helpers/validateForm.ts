import { FormGroup } from "@angular/forms";

export default class ValidateForm {
    static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormGroup) {
                control.markAsDirty({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}