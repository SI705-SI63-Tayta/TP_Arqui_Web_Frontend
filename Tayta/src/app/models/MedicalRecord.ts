import { User } from "./User"

export class MedicalRecord{
    idMedicalRecord:number=0
    dateMedicalRecord:Date=new Date(Date.now())
    u: User = new User()
}