import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageMyPlantsComponent } from './pages/page-my-plants/page-my-plants.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageAddPlantComponent } from './pages/page-add-plant/page-add-plant.component';
import { PageConnectComponent } from './pages/page-connect/page-connect.component';
import { PageSubscribeComponent } from './pages/page-subscribe/page-subscribe.component';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: 'full' },
  { path: "login", component: PageConnectComponent },
  { path: "login/subscribe", component: PageSubscribeComponent },
  { path: "home", component: PageHomeComponent },
  { path: "admin/add-plant", component: PageAddPlantComponent },
  { path: "my-plants", component: PageMyPlantsComponent },
  { path: "admin", component: PageAdminComponent},
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
