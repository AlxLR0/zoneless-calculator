import { Routes } from '@angular/router';
import { CalculatorViewComponent } from './views/calculator-view/calculator-view.component';

export const routes: Routes = [
    {
        path: 'calculator',
        loadComponent: () => import('./views/calculator-view/calculator-view.component').then(m => m.CalculatorViewComponent)
    },
    {
        path: '**',
        redirectTo: 'calculator'
    }
];
