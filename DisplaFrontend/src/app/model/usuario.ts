export interface Usuario {
    Id: number,
    Nombre: string,
    Apellido: string,
    Mail: string;
    UserName: string,
    Password: string,
    ConfirmPassword: string,
    Roles: any,
    Activo: boolean
}

export interface EditUsuarioDTO {
    Id: number,
    UserName: string,
    Nombre: string,
    Apellido: string,
    Mail: string,
    Roles: string[]
}