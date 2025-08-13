import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import {ReseñasComponent} from './Pages/resenias/reseñas.component';
import { AdminComponent } from './Pages/admin/admin-slot/admin-slot.component'; 
import { AdminClaseComponent } from './Pages/admin/admin-clases/admin-clases.component'; 
import { AdminProfesoresComponent } from './Pages/admin/admin-profesores/admin-profesores.component'; 
import {ComoComenzarComponent} from './Pages/como-comenzar/como-comenzar.component';
import { NovedadesComponent} from './Pages/Novedades/Novedades.component';
import {ClassComponent} from './Pages/class/class.component';
import { UbicacionComponent } from './Pages/ubicacion/ubicacion.component';
import { IniciarSesionComponent } from './Pages/iniciar-sesion/iniciar-sesion.component';
import { authGuard } from '../auth.guard';
import { AdminSetearProfesorComponent } from './Pages/admin/admin-setear-profesor/admin-setear-profesor.component';
import { RevisarTablaComponent } from './Pages/admin/revisar-tabla/revisar-tabla.component';
import { MostrarTablaComponent } from './Pages/mostrar-tabla/mostrar-tabla.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent
    },{ path: 'como-comenzar', component: ComoComenzarComponent
    },{ path: 'mostrar-tabla', component: MostrarTablaComponent
    },{ path: 'novedades', component:  NovedadesComponent
    },{ path: 'class/:className', component: ClassComponent
    },{ path: 'iniciar-sesion', component: IniciarSesionComponent 
    },{ path: 'admin', component: AdminComponent, canActivate: [authGuard] 
    },{ path: 'admin-clases', component: AdminClaseComponent, canActivate: [authGuard] 
    },{path: 'ubicacion', component: UbicacionComponent
    },{path: 'admin-profesores', component: AdminProfesoresComponent, canActivate: [authGuard]
    },{path: 'admin-setear-profesor', component: AdminSetearProfesorComponent, canActivate: [authGuard]   
    },{ path: 'revisar-tabla', component: RevisarTablaComponent, canActivate: [authGuard] 
    }
    ,{
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }/*,{
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }*/
];

