import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    SubirArchivoService,
    HospitalService,
    MedicoService
} from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SettingsService,
        SharedService,
        SidebarService,
        UsuarioService,
        LoginGuardGuard,
        AdminGuard,
        VerificaTokenGuard,
        SubirArchivoService,
        ModalUploadService,
        HospitalService,
        MedicoService
    ],
    declarations: []
})
export class ServiceModule { }
