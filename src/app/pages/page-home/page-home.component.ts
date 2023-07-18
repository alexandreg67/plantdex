import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit{

  plantsToDisplay!: Plant[];
  plantsToDisplayFilter!: Plant[];
  plantsToDisplayFilterGoutte!: Plant[];
  categories!: string[];
  categorieFiltre: string[] = [];
  tabNbrDeGouttes: number[] = [];

  nombreDeGouttes!:number[]


  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    // this.plantService.getPlants().subscribe((plants: Plant[]) => {
    //   this.plantsToDisplay = plants;
    //   console.log(this.plantsToDisplay);
    // })
      const notreFluxDonnees = this.plantService.getPlants();
      notreFluxDonnees.subscribe((data: Plant[]) => {
      console.log('mes données après call api : ', data);

      this.plantsToDisplay = data;
      this.plantsToDisplayFilter = [...this.plantsToDisplay];
      this.categories = [... new Set(this.plantsToDisplay.map(e => e.categorie))]; 
      this.nombreDeGouttes = [... new Set(this.plantsToDisplay.map(e => e.arrosage).sort())]
      console.log(this.nombreDeGouttes);
      
    });

  }
  addCategories(newCategorie: string) {
    if (this.categorieFiltre.includes(newCategorie)) {
      this.categorieFiltre = this.categorieFiltre.filter(e => e != newCategorie)
    }else {
      this.categorieFiltre.push(newCategorie)
    }
    this.filterAllPlants()
  }

  addNomreDeGoutte(nbrDeGoutte:number) {  
    if (this.tabNbrDeGouttes.includes(nbrDeGoutte)) {
      this.tabNbrDeGouttes = this.tabNbrDeGouttes.filter(e => e != nbrDeGoutte)
    }else {
      this.tabNbrDeGouttes.push(nbrDeGoutte)
    }
    this.filterAllPlants()
  }

  filterAllPlants() {
    if (this.categorieFiltre.length != 0 && this.tabNbrDeGouttes.length !=0) {  
      this.plantsToDisplayFilter = this.plantsToDisplay
        .filter(e => this.categorieFiltre
        .includes(e.categorie))
        .filter(e => this.tabNbrDeGouttes.includes(e.arrosage))       
    } else if (this.categorieFiltre.length == 0 && this.tabNbrDeGouttes.length !=0) {
      this.plantsToDisplayFilter = this.plantsToDisplay
        .filter(e => this.tabNbrDeGouttes
        .includes(e.arrosage));
    } else if (this.categorieFiltre.length != 0 && this.tabNbrDeGouttes.length ==0) {
      this.plantsToDisplayFilter = this.plantsToDisplay
        .filter(e => this.categorieFiltre
        .includes(e.categorie))
    } else if (this.categorieFiltre.length == 0 && this.tabNbrDeGouttes.length == 0) {
      this.plantsToDisplayFilter = this.plantsToDisplay
    }
  }

}
