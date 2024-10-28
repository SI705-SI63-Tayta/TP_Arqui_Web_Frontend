import { Routes } from '@angular/router';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { CreareditaappointmentComponent } from './components/appointment/creareditaappointment/creareditaappointment.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CreaeditarecipeComponent } from './components/recipe/creaeditarecipe/creaeditarecipe.component';

export const routes: Routes = [
    {
        path:'citas',component:AppointmentComponent,
        children:[
            {
                path:'registrar',component:CreareditaappointmentComponent
            },
            {
              path:'ediciones/:id',component:CreareditaappointmentComponent
            }
        ]
    },
    {
        path:'recetas',component:RecipeComponent,
        children:[
            {
                path:'registrar',component:CreaeditarecipeComponent
            },
            {
              path:'ediciones/:id',component:CreaeditarecipeComponent
            }
        ]
    }
];
