import { MedicalRecord } from './MedicalRecord';
import { Recipe } from './Recipe';
import { Appointment } from './Appointment';

export class ClinicalHistoryDetail {
  idDetalleHistoria: number = 0;
  medicalRecord: MedicalRecord = new MedicalRecord();
  recipe: Recipe = new Recipe();
  appointment: Appointment = new Appointment();
  diagnostico: String = '';
}
