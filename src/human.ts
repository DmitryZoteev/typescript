export class Human{
    private _name: string;
    private _age: number;
    private _address: string;

    constructor(_name: string, _age: number, _address: string) {
        this._name = _name;
        this._age = _age;
        this._address = _address;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    toString(): string{
        return 'Имя: ' + this._name
            + ', Возраст: ' + this._age
            + ', Адрес: ' + this._address
    }
}