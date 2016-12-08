export class Copia {
    constructor(
        public _id:string,
        public idGame,
        public estado,//: { type: String, enum: ["ok", "dañado", "perdido", "irreparable"] },
        public disponibilidad
    ) {
    }
}