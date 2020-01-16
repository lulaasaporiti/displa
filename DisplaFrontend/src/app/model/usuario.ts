export interface Usuario {
    id: number,
    nombre: string,
    apellido: string,
    mail: string;
    userName: string,
    password: string,
    confirmPassword: string,
    roles: any,
    activo: boolean
}

export interface EditUsuarioDTO {
    id: number,
    userName: string,
    nombre: string,
    apellido: string,
    mail: string,
    roles: string[]
}