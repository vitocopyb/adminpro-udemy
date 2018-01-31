import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styles: []
    })
export class ProgressComponent implements OnInit {
    progreso1: number = 20;
    progreso2: number = 30;

    constructor() {}
    ngOnInit() {}

    // se puede parametrizar esta funcion para saber cual progreso debe actualizar
    /*
    actualizar( event: number ) {
        console.log('Event: ', event);
        // para cambiar el valor se asigna el valor del event
        this.progreso1 = event;
    }
    */

}
