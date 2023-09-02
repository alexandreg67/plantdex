import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageMyPlantsComponent } from './pages/page-my-plants/page-my-plants.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageAddPlantComponent } from './pages/page-add-plant/page-add-plant.component';
import { PageConnectComponent } from './pages/page-connect/page-connect.component';
import { PageSubscribeComponent } from './pages/page-subscribe/page-subscribe.component';
import { AuthGuard } from '../app/guard/auth-guard.guard';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: PageHomeComponent},
  { path: "login", component: PageConnectComponent },
  { path: "login/subscribe", component: PageSubscribeComponent },
  { path: "my-plants", component: PageMyPlantsComponent },
  { path: 'admin',
    canActivate: [AuthGuard],
    children: [ // On définit les routes enfants
        { path: "", component: PageAdminComponent, canActivate: [AuthGuard] }, 
        { path: "add-plant", component: PageAddPlantComponent, canActivate: [AuthGuard] },
    ] },
  { path: "**", component: PageNotFoundComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
