import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import {ReseñasComponent} from './Pages/reseñas/reseñas.component';
import {LogInComponent} from './Pages/LogIn/LogIn.component';
import { AdminComponent } from './Pages/admin/admin.component'; 
import { AdminClaseComponent } from './Pages/admin/admin-clases/admin-clases.component'; 
import { AdminProfesoresComponent } from './Pages/admin/admin-profesores/admin-profesores.component'; 
import {ComoComenzarComponent} from './Pages/como-comenzar/como-comenzar.component';
import {PlanesComponent} from './Pages/planes/planes.component';
import { NovedadesComponent} from './Pages/Novedades/Novedades.component';
import {ClassComponent} from './Pages/class/class.component';

export const routes: Routes = [
    { path: 'inicio',
    component: InicioComponent
    },{ path: 'reseñas',
    component: ReseñasComponent
    },{ path: 'como-comenzar',
    component: ComoComenzarComponent
    },{ path: 'planes',
    component: PlanesComponent
    },{ path: 'novedades',
    component:  NovedadesComponent
    },{ path: 'class/:className',
    component: ClassComponent
    },{ path: 'Login',
    component: LogInComponent
    },{ path: 'Admin',
    component: AdminComponent
    },{ path: 'admin-clases',
    component: AdminClaseComponent
    },{path: 'admin-profesores',
    component: AdminProfesoresComponent
    },{
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },{
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }
];

