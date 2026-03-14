import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Pokemons } from './Pages/pokemons/pokemons';
import { Detalhes } from './Pages/detalhes/detalhes';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'pokemons',
        component: Pokemons
    },
    {
        path: 'detalhes/:id',
        component: Detalhes
    }
];
