import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Pokemons } from './Pages/pokemons/pokemons';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'pokemons',
        component: Pokemons
    }
];
