import { Routes } from '@angular/router';
import { CrudLocalStorage } from './crud-local-storage/crud-local-storage';
import { CrudIndexedDb } from './crud-indexed-db/crud-indexed-db';
import { CrudApiNode } from './crud-api-node/crud-api-node';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
    { path: 'crud-local-storage', component: CrudLocalStorage },
    { path: 'crud-indexed-db', component: CrudIndexedDb },
    { path: 'crud-api-node', component: CrudApiNode },
    { path: '', component: Inicio },
];
