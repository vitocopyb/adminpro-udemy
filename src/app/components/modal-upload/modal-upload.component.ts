import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
    selector: 'app-modal-upload',
    templateUrl: './modal-upload.component.html',
    styles: []
})
export class ModalUploadComponent implements OnInit {

    imagenSubir: File;
    imagenTemp: string;

    constructor(
        public _subirArchivoService: SubirArchivoService,
        public _modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {}

    cerrarModal() {
        this.imagenSubir = null;
        this.imagenTemp = null;
        this._modalUploadService.ocultarModal();
    }

    seleccionImage(archivo: File) {
        if (!archivo) {
            this.imagenSubir = null;
            return;
        }

        // valida que solo se suban tipo imagenes
        if (archivo.type.indexOf('image') < 0) {
            swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imagenSubir = null;
            return;
        }

        this.imagenSubir = archivo;

        // muestra la imagen en forma temporal. El codigo es js nativo
        const reader = new FileReader();
        const urlImagenTemp = reader.readAsDataURL(archivo);
        reader.onloadend = () => this.imagenTemp = reader.result;
    }

    subirImagen() {
        this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
            .then(resp => {
                // emite que la carga del archivo fue exitosa
                this._modalUploadService.notificacion.emit(resp);
                this.cerrarModal();
            })
            .catch(resp => {

            });
    }

}
