import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {
    constructor() {}

    /**
     * el metodo esta construido con js nativo
     */
    subirArchivo(archivo: File, tipo: string, id: string) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            const xhr = new XMLHttpRequest();

            // setea valores, 'imagen' es el nombre del atributo que se envia en el servicio
            formData.append('imagen', archivo, archivo.name);

            // configuracion peticion ajax
            xhr.onreadystatechange = function() {
                // se monitorea el estado cuando ya esta finalizado
                if (xhr.readyState === 4) {
                    // el archivo subio correctamente
                    if (xhr.status === 200) {
                        console.log('Imagen subida');
                        resolve(JSON.parse(xhr.response));
                    } else {
                        console.log('Fallo la subida');
                        reject(xhr.response);
                    }
                }
            };

            const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
            xhr.open('PUT', url, true);
            xhr.send(formData);
        });
    }
}
