import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import {ReseñasComponent} from './Pages/reseñas/reseñas.component';
import { AdminComponent } from './Pages/admin/admin-slot/admin-slot.component'; 
import { AdminClaseComponent } from './Pages/admin/admin-clases/admin-clases.component'; 
import { AdminProfesoresComponent } from './Pages/admin/admin-profesores/admin-profesores.component'; 
import {ComoComenzarComponent} from './Pages/como-comenzar/como-comenzar.component';
import { NovedadesComponent} from './Pages/Novedades/Novedades.component';
import {ClassComponent} from './Pages/class/class.component';
import { UbicacionComponent } from './Pages/ubicacion/ubicacion.component';
import { IniciarSesionComponent } from './Pages/iniciar-sesion/iniciar-sesion.component';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent
    },{ path: 'reseñas', component: ReseñasComponent
    },{ path: 'como-comenzar', component: ComoComenzarComponent
    },{ path: 'novedades', component:  NovedadesComponent
    },{ path: 'class/:className', component: ClassComponent
    },{ path: 'iniciar-sesion', component: IniciarSesionComponent 
    },{ path: 'admin', component: AdminComponent, canActivate: [authGuard] 
    },{ path: 'admin-clases', component: AdminClaseComponent
    },{path: 'ubicacion', component: UbicacionComponent
    },{path: 'admin-profesores', component: AdminProfesoresComponent
    },{
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }/*,{
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }*/
];

