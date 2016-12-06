export class User {
    constructor(
        public _id: string,
        public nombre: string,
        public apellidos: string,
        public telefono: string,
        public direccion: string,
        public foto:any,
        public email: string,
        public password: string
    ) {
    }
}
