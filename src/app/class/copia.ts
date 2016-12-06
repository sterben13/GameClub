export class Copia {
    constructor(
        public idGame,
        public estado,//: { type: String, enum: ["ok", "dañado", "perdido", "irreparable"] },
        public disponibilidad
    ) {
    }
}