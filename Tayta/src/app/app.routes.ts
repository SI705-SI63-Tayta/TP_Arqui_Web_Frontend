import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { CreareditaappointmentComponent } from './components/appointment/creareditaappointment/creareditaappointment.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CreaeditarecipeComponent } from './components/recipe/creaeditarecipe/creaeditarecipe.component';

import { RoleComponent } from './components/role/role.component';
import { CreaeditaroleComponent } from './components/role/creaeditarole/creaeditarole.component';

import { MenubienvenidaComponent } from './components/menubienvenida/menubienvenida.component';
import { segGuard } from './guard/seguridad.guard';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DailyactivitiesComponent } from './components/dailyactivities/dailyactivities.component';
import { CreareditardailyactivitiesComponent } from './components/dailyactivities/creareditardailyactivities/creareditardailyactivities.component';
import { MenulandingComponent } from './components/menulanding/menulanding.component';
import { RegisterComponent } from './components/register/register.component';
import { ClinicalhistorydetailComponent } from './components/clinicalhistorydetail/clinicalhistorydetail.component';
import { CreareditarclinicalhistorydetailComponent } from './components/clinicalhistorydetail/creareditarclinicalhistorydetail/creareditarclinicalhistorydetail.component';
import { ListarclinicalhistorydetailComponent } from './components/clinicalhistorydetail/listarclinicalhistorydetail/listarclinicalhistorydetail.component';
import { MedicalrecordComponent } from './components/medicalrecord/medicalrecord.component';
import { CreaeditamedicalrecordComponent } from './components/medicalrecord/creaeditamedicalrecord/creaeditamedicalrecord.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ReviewComponent } from './components/review/review.component';
import { CreareditarnotificationComponent } from './components/notification/creareditarnotification/creareditarnotification.component';
import { CreareditarreviewComponent } from './components/review/creareditarreview/creareditarreview.component';
import { UserComponent } from './components/user/user.component';
import { CreareditaruserComponent } from './components/user/creareditaruser/creareditaruser.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportappointmentmodeComponent } from './components/reportes/reportappointmentmode/reportappointmentmode.component';
import { ReportquantityappointmentperiodComponent } from './components/reportes/reportquantityappointmentperiod/reportquantityappointmentperiod.component';
import { Top5calificacionComponent } from './components/reportes/top5calificacion/top5calificacion.component';
import { RecipesfinishedclientComponent } from './components/reportes/recipesfinishedclient/recipesfinishedclient.component';
import { Resenamayor3Component } from './components/reportes/resenamayor3/resenamayor3.component';




export const routes: Routes = [
  {
    path: '', redirectTo: 'menulanding', pathMatch: 'full' // Redirige a login por defecto
  },
  {
    path: 'menulanding', component: MenulandingComponent // Redirige a login por defecto
  }
  ,
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  }
  ,
  {
    path: '', component: ToolbarComponent, canActivate: [segGuard],
    children: [
      {
        path: 'menubienvenida', component: MenubienvenidaComponent
      },
      {
        path: 'citas', component: AppointmentComponent,
        children: [
          {
            path: 'registrar', component: CreareditaappointmentComponent
          },
          {
            path: 'ediciones/:id', component: CreareditaappointmentComponent
          }
        ],
        canActivate: [segGuard],
      },
      {
        path: 'recetas', component: RecipeComponent,
        children: [
          {
            path: 'registrar/:idAppointment', component: CreaeditarecipeComponent
          },
          {
            path: 'ediciones/:id/:idCita', component: CreaeditarecipeComponent
          }
        ],
        canActivate: [segGuard],
      },
      {
        path: 'actividades', component: DailyactivitiesComponent,
        children: [
          {
            path: 'registrar', component: CreareditardailyactivitiesComponent
          },
          {
            path: 'ediciones/:id', component: CreareditardailyactivitiesComponent
          }
        ],
        canActivate: [segGuard],
      },
      {
        path: 'detallehistoriaclinica', component: ClinicalhistorydetailComponent,
        children: [
          {
            path: 'registrar', component: CreareditarclinicalhistorydetailComponent
          },
          {
            path: 'ediciones/:id', component: CreareditarclinicalhistorydetailComponent
          },
        ],
        canActivate: [segGuard],
      },
      {
        path: 'historiaclinica', component: MedicalrecordComponent,
        children: [
          {
            path: 'registrar', component: CreaeditamedicalrecordComponent
          },

          {
            path: 'ediciones/:id', component: CreaeditamedicalrecordComponent
          },
        ],
        canActivate: [segGuard],
      },
      {
        path: 'notificaciones', component: NotificationComponent,
        children: [
          {
            path: 'registrar', component: CreareditarnotificationComponent
          },
          {
            path: 'ediciones/:id', component: CreareditarnotificationComponent
          }
        ],
        canActivate: [segGuard],
      },
      {
        path: 'resenas', component: ReviewComponent,
        children: [
          {
            path: 'registrar', component: CreareditarreviewComponent
          },
          {
            path: 'ediciones/:id', component: CreareditarreviewComponent
          }
        ],
        canActivate: [segGuard],
      },
      {
        path: 'usuarios', component:UserComponent,
        children:[
          {
            path: 'ediciones',component:CreareditaruserComponent
          }

        ]
      },
      {
        path: 'reportes', component:ReportesComponent,
        children:[
          {
            path: 'cantidadcitas',component:ReportappointmentmodeComponent
          },
          {
            path: 'cantidadcitasPediodo',component:ReportquantityappointmentperiodComponent
          }
        ],
        
      }
    ]
  },

  {
    path: 'roles', component: RoleComponent,
    children: [

        ],
        canActivate: [segGuard],
      },

      {
        path: 'roles', component: RoleComponent,
        children: [
          {
            path: 'registrar', component: CreaeditaroleComponent
          },
          {
            path: 'ediciones/:id', component: CreaeditaroleComponent
          }
        ],
        canActivate: [segGuard]
      },
      {
        path:'reportes', component:ReportesComponent,
        children: [
          {
            path:'top5personal', component: Top5calificacionComponent
          },
          {
            path:'recipesfinished', component: RecipesfinishedclientComponent
          },
          {
            path:'listaCalificacionmayor3', component:Resenamayor3Component
          }
        ]
      }
    ]
  },  
      



];
