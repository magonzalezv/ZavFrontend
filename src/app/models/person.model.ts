export class Person {


    constructor (
        public name: string,
        public email: string,
        public cellphone: number,
        public reason: string,
        public comment?: string,
        public id?: string,
        public created_at?: string,
        public updated_at?: string
    ) { }
}
