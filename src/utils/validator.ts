

export interface RegexMap {
    readonly [key: string]: RegExp;

}
export interface Valid {
    message: string
    isValid: boolean;
}
export class Validator{
    Regex: RegexMap;
    constructor(regex: RegexMap){
        this.Regex = regex;
    }
    public validation(text: string): Valid[]{
        let result: Valid[] = [];
        for (const key of Object.keys(this.Regex)){
            const pattern = this.Regex[key];
            result = [...result, {message: key, isValid: pattern.test(text)}];
        }
        return result;
    }
}

export const regexPasswordMap: RegexMap = {
        'At least one lowercase letter': /^(?=.*[a-z]).*$/,
        'At least one uppercase letter': /^(?=.*[A-Z]).*$/,
        'At least one number': /^(?=.*\d).*$/,
        'At least one special character (!@#$%^&*)': /^(?=.*[!@#$%^&*]).*$/,
        'At least 8 characters long': /^.{8,}$/,
        'No spaces': /^(?!.*\s).*$/
};
