import { User } from "./User"

export class Appointment {
    idAppointment: number = 0
    date:Date=new Date(Date.now())
    reason: string = ""
    mode: string = ""
    description: string = ""
    latitude:number=0
    longitude:number=0
    userCliente: User = new User();
    userPersonal: User = new User();
}
