import { AbstractControl, FormGroup } from "@angular/forms";

export class Utils {
   static generateId(): number {
      return Math.round(Math.random() * 10000)
   }

   static isFormControlInvalid(controlName: string, form: FormGroup): boolean {
      const ctrl = this.getFormCtrl(controlName, form)

      if (!ctrl)
         return false;
      if (ctrl?.errors && ctrl?.touched)
         return true;

      return false;
   }

   static isFormControlInvalidError(controlName: string, error: string, form: FormGroup): boolean {
      const ctrl = this.getFormCtrl(controlName, form)

      if (!ctrl)
         return false;
      if (ctrl?.getError(error) && ctrl?.touched)
         return true;

      return false;
   }

   static getFormCtrl(controlName: string, form: FormGroup): AbstractControl | null {
      return form.get(controlName);
   }
}
