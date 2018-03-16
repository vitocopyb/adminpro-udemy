import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styles: []
})
export class BreadcrumbsComponent implements OnInit {

    label: string = '';

    constructor(
        private router: Router,
        public title: Title,
        public meta: Meta
    ) {
        this.getDataRoute()
            .subscribe( data => {
                this.label = data.titulo;
                this.title.setTitle( this.label );

                // modifica los meta de la pagina
                let metaTag: MetaDefinition = {
                    name: 'description',
                    content: this.label
                };

                this.meta.updateTag(metaTag);

                /*
                let metaTag2: MetaDefinition = {
                    name: 'author',
                    content: 'VSR'
                };
                this.meta.updateTag(metaTag2);
                */
            });
    }

    ngOnInit() {
    }

    getDataRoute() {
        return this.router.events
            .filter( evento => evento instanceof ActivationEnd ) // filtra los eventos de tipo ActivationEnd
            .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ) // filtra los eventos donde el firstChild sea nulo
            .map( (evento: ActivationEnd) => evento.snapshot.data ) // retorna solamente la propiedad "data"
    }
}
