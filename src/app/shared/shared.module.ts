import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from './../pipes/pipes.module';

// Componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
    ],
    // export se utiliza para exponer los modulos que se pueden utilizar desde otro lado que no sea dentro de PagesModule
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
    ]
})
export class SharedModule { }
