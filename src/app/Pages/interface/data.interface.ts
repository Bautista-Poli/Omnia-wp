export interface Class {
    name: string;
    id: number;
}

//Creo una interface para la info que viene de la base de datos
export interface ClassInfo {
    nombre_clase: string;
    horario: string;
    dia_semana: number;
    id: number;
}
export interface Hours {
  [hour: string]: (Class | null)[];
}

export interface Schedule {
    day:Array<string>;
}

