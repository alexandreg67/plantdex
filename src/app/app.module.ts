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
import { FormsModule } from '@angular/forms';


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
    FilterBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
