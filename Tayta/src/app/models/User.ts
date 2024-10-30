import { Role } from "./Role"

export class User {
    idUser: number = 0;
    fullName: string = "";
    email: string = "";
    username: string = "";
    enabled: boolean = true;
    address: string = "";
    dni: string = "";
    role: Role = new Role();
}