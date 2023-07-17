import { Component, OnInit, Output } from '@angular/core';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit{

  plantsToDisplay!: Plant[];
  categories!: string[];
  categorieFiltre: string[] = [] ;
  plantsToDisplayFilter!: Plant[]

  constructor(private plantService: PlantService) {}


  ngOnInit(): void {
    // this.plantService.getPlants().subscribe((plants: Plant[]) => {
    //   this.plantsToDisplay = plants;
    //   console.log(this.plantsToDisplay);
    // })
    const notreFluxDonnees = this.plantService.getPlants();
    notreFluxDonnees.subscribe((data: Plant[]) => {
      // console.log('mes données après call api : ', data);
      this.plantsToDisplay = data;
      this.plantsToDisplayFilter = this.plantsToDisplay;
      this.categories = [... new Set(this.plantsToDisplay.map(e => e.categorie))];    
    });

  }
  addCategories(newCategorie: string) {
    if (this.categorieFiltre.includes(newCategorie)) {
      this.categorieFiltre = this.categorieFiltre.filter(e => e != newCategorie)
    }else {
      this.categorieFiltre.push(newCategorie)
    }

    // console.log(this.categorieFiltre); 

    if (this.categorieFiltre.length !== 0) {         
      this.plantsToDisplayFilter = this.plantsToDisplay.filter(e => this.categorieFiltre.includes(e.categorie))
      // console.log(this.plantsToDisplayFilter);
    } else {
      this.plantsToDisplayFilter = this.plantsToDisplay;
      // console.log(this.plantsToDisplayFilter);
    }
      
  }
}
