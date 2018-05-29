import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { VerificaTokenGuard } from './services/guards/verifica-token.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        canActivateChild: [ VerificaTokenGuard ],
        // string compuesto por el path del modulo que contiene las paginas y el nombre del modulo
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
