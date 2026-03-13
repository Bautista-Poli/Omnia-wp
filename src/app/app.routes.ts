import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { AdminComponent } from './Pages/admin/admin-slot/admin-slot-grid/admin-slot.component'; 
import { AdminClaseComponent } from './Pages/admin/admin-clases/admin-clases.component'; 
import { AdminProfesoresEliminarComponent } from './Pages/admin/admin-profesores/admin-profesor-eliminar/admin-profesor-agregar.component'; 
import {ComoComenzarComponent} from './Pages/como-comenzar/como-comenzar.component';
import { NovedadesComponent} from './Pages/Novedades/Novedades.component';
import {ClassComponent} from './Pages/class/class.component';
import { UbicacionComponent } from './Pages/ubicacion/ubicacion.component';
import { IniciarSesionComponent } from './Pages/iniciar-sesion/iniciar-sesion.component';
import { authGuard } from '../auth.guard';
import { RevisarTablaComponent } from './Pages/admin/revisar-tabla/revisar-tabla.component';
import { MostrarTablaComponent } from './Pages/mostrar-tabla/mostrar-tabla.component';
import { AdminProfesoresAgregarComponent } from './Pages/admin/admin-profesores/admin-profesor-agregar/admin-profesores-grid.component';
import { AdminClaseAgregarComponent } from './Pages/admin/admin-clases/admin-clases-agregar/admin-clases-agregar.component';
import { AdminSlotChangeProfesorComponent } from './Pages/admin/admin-slot/admin-slot-change-profesor/admin-slot-change-profesor.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent
    },{ path: 'como-comenzar', component: ComoComenzarComponent
    },{ path: 'mostrar-tabla', component: MostrarTablaComponent
    },{ path: 'novedades', component:  NovedadesComponent
    },{ path: 'class/:className', component: ClassComponent
    },{ path: 'iniciar-sesion', component: IniciarSesionComponent 
    },{ path: 'admin', component: AdminComponent, canActivate: [authGuard] 
    },{ path: 'admin-clases', component: AdminClaseComponent, canActivate: [authGuard] 
    },{ path: 'admin-clases-agregar', component: AdminClaseAgregarComponent, canActivate: [authGuard] 
    },{path: 'admin-profesor-eliminar', component: AdminProfesoresEliminarComponent, canActivate: [authGuard]
    },{path: 'admin-profesor-agregar', component: AdminProfesoresAgregarComponent, canActivate: [authGuard]
    },{ path: 'admin-slot-change-profesor', component: AdminSlotChangeProfesorComponent, canActivate: [authGuard] 
    },{ path: 'revisar-tabla', component: RevisarTablaComponent, canActivate: [authGuard] 
    },{path: 'ubicacion', component: UbicacionComponent
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

