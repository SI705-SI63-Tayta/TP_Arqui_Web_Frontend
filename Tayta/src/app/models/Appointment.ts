import { User } from "./User"

export class Appointment {
    idAppointment: number = 0
    date:Date=new Date(Date.now())
    reason: string = ""
    mode: string = ""
    description: string = ""
    latitude:string=""
    longitude:string=""
    userCliente: User = new User();
    userPersonal: User = new User();
}
