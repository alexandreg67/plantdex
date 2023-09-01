import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageMyPlantsComponent } from './pages/page-my-plants/page-my-plants.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { CardComponent } from './components/card/card.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { GroupButtonComponent } from './components/group-button/group-button.component';
import { AdmintableComponent } from './components/admintable/admintable.component';
import { PageAddPlantComponent } from './pages/page-add-plant/page-add-plant.component';
import { PlantformComponent } from './components/plantform/plantform.component';
import { PageConnectComponent } from './pages/page-connect/page-connect.component';
import { PageSubscribeComponent } from './pages/page-subscribe/page-subscribe.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageHomeComponent,
    PageMyPlantsComponent,
    PageNotFoundComponent,
    PageAdminComponent,
    PlantListComponent,
    CardComponent,
    FilterBarComponent,
    SearchBarComponent,
    GroupButtonComponent,
    AdmintableComponent,
    PageAddPlantComponent,
    PlantformComponent,
    PageConnectComponent,
    PageSubscribeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
