import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
// import { PagesModule } from './pages/pages.module';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        PagesComponent // se agrega en el root de la aplicacion
    ],
    imports: [
        BrowserModule,
        APP_ROUTES,
        // PagesModule, // se quita porque se carga dinamicamente en app.routes
        FormsModule,
        ReactiveFormsModule,
        ServiceModule,
        SharedModule // se agrega para que se puedan utilizar los componetntes del PageComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
