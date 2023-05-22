import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value === null || control.value === '') {
            return null;
        }
        const isWhitespace = (control.value || '').trim().length === 0;
        return isWhitespace ? { whitespace: true } : null;
    }
}

export function noInitialAndFinalWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value === null || control.value === '') {
            return null;
        }

        if (control.value[0] === ' ' || control.value[control.value.length - 1] === ' ') {
            return { initialfinalwhitespace: true };
        }
        return null;
    };
}


export const SamePasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmationPassword = control.get('confirmationPassword')?.value;
    if (confirmationPassword && password) {
        if (confirmationPassword === password) {
            return null;
        }
    }

    return { samepassword: true };
};

export const SameNewPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword')?.value;
    const confirmationPassword = control.get('confirmationPassword')?.value;
    if (confirmationPassword && password) {
        if (confirmationPassword === password) {
            return null;
        }
    }

    return { samepassword: true };
};

export const VerifyPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const newPassword = control.get('newPassword')?.value;
    const confirmationPassword = control.get('confirmationPassword')?.value;

    if (password && newPassword) {
        if (password === newPassword) {
            return { sameNewPassword: true };
        }
    }

    if (newPassword && confirmationPassword) {
        if (newPassword !== confirmationPassword) {
            return { samepassword: true };
        }
    }

    return null;
};

export function NumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value) {
            const number = control.value as string;
            const numbererror = number.match('^[0-9]*$');
            return !numbererror ? { numbererror: { value: numbererror } } : null;
        }
        return null;
    };
}

export function AlphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value) {
            const value = control.value as string;
            const alphanumeric = value.match('^[a-zA-Z0-9]*$');
            return !alphanumeric ? { alphanumeric: { value: alphanumeric } } : null;
        }
        return null;
    };
}