import { Routes,RouterModule  } from '@angular/router';
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


export const routes: Routes = [
    {
        path: '', redirectTo: 'menulanding', pathMatch: 'full' // Redirige a login por defecto
    },
    {
        path: 'menulanding', component:MenulandingComponent // Redirige a login por defecto
    }
    ,
    {
        path: 'login', component: LoginComponent
    },
    {
        path:'register', component:RegisterComponent
    }
    ,
    {
        path:'', component:ToolbarComponent, canActivate: [segGuard],
        children:[
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
                        path: 'registrar', component: CreaeditarecipeComponent
                    },
                    {
                        path:'listar',component:RecipeComponent
                    },
                    {
                      path: 'ediciones/:id', component: CreaeditarecipeComponent
                    }
                ],
                canActivate: [segGuard],
            },
            {
                path:'actividades',component:DailyactivitiesComponent,
                children:[
                    {
                        path:'registrar', component:CreareditardailyactivitiesComponent
                    },
                    {
                      path: 'ediciones/:id', component: CreareditardailyactivitiesComponent
                    }
                ],
                canActivate: [segGuard],
            },
            {
                path:'detallehistoriaclinica',component:ClinicalhistorydetailComponent,
                children:[
                    {
                        path:'registrar', component:CreareditarclinicalhistorydetailComponent
                    },
                    {
                        path:'listar',component:ListarclinicalhistorydetailComponent
                    },
                    {
                        path:'ediciones/:id', component:CreareditarclinicalhistorydetailComponent
                    },
                ],
                canActivate: [segGuard],
            },
            {
                path:'historiaclinica',component:MedicalrecordComponent,
                children:[
                    {
                        path:'registrar', component:CreaeditamedicalrecordComponent
                    },

                    {
                        path:'ediciones/:id', component:CreaeditamedicalrecordComponent
                    },
                ],
                canActivate: [segGuard],
            },
            {
                path:'notificaciones',component:NotificationComponent,
                children:[
                  {
                    path:'registrar', component:CreareditarnotificationComponent
                  },
                  {
                    path:'ediciones/:id', component:CreareditarnotificationComponent
                  }
                ]
            },
            {
              path:'resenas',component:ReviewComponent,
              children:[
                {
                  path:'registrar',component:CreareditarreviewComponent
                },
                {
                  path:'ediciones/:id', component:CreareditarreviewComponent
                }
              ]
            }
        ]
    },

    {
        path:'roles',component:RoleComponent,
        children:[
            {
                path:'registrar',component:CreaeditaroleComponent
            },
            {
              path:'ediciones/:id',component:CreaeditaroleComponent
            }
        ]
    }

];
