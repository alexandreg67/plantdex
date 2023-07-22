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

  categories: string[] = [];
  tabCategoriesFilter: string[] = [];

  nombreDeGouttes: number[] = [];
  tabNombreDeGouttesFilter: number[] = []

  tabEtatMeteo: string[] = [];
  tabEtatMeteoFilter:string[] = [];

  userInput!:string;
  categoriesChecked!: string[];

  countAlpha!: number;

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
      const notreFluxDonnees = this.plantService.getPlants();
      notreFluxDonnees.subscribe((data: Plant[]) => {

      this.plantsToDisplay = data;
      this.plantsToDisplayFilter = [...this.plantsToDisplay];
      this.categories = [... new Set(this.plantsToDisplay.map(e => e.categorie))]; 
      this.nombreDeGouttes = [... new Set(this.plantsToDisplay.map(e => e.arrosage).sort())];
      this.tabEtatMeteo = [... new Set(this.plantsToDisplay.map(e => e.soleil))] 
      this.tabCategoriesFilter = this.categories;
      this.tabNombreDeGouttesFilter = this.nombreDeGouttes;
      this.tabEtatMeteoFilter = this.tabEtatMeteo;
      this.countAlpha = 0;
    });

  }
  
  selectCategorie(categorie:string) {
    if (this.tabCategoriesFilter.includes(categorie)) {
      this.tabCategoriesFilter = this.tabCategoriesFilter.filter(e => e != categorie)
    }else {
      this.tabCategoriesFilter.push(categorie)
    }
    this.onUserInteractionFiltre()
  }

  selectSoleil(soleil:string) {
    if (this.tabEtatMeteoFilter.includes(soleil)) {
      this.tabEtatMeteoFilter = this.tabEtatMeteoFilter.filter(e => e != soleil)
    }else {
      this.tabEtatMeteoFilter.push(soleil)
    }
    this.onUserInteractionFiltre()
  }

  selectGouttes(gouttes:number) {
    if (this.tabNombreDeGouttesFilter.includes(gouttes)) {
      this.tabNombreDeGouttesFilter = this.tabNombreDeGouttesFilter.filter(e => e != gouttes)
    }else {
      this.tabNombreDeGouttesFilter.push(gouttes)
    }
    this.onUserInteractionFiltre()
  }

  onEnterSearch(resultUserSearch:string){
    this.userInput = resultUserSearch;
    this.onUserInteractionFiltre()
  }

  onUserInteractionFiltre() {
    this.plantsToDisplayFilter = [...this.plantsToDisplay]
    
    if(this.userInput) {
      this.plantsToDisplayFilter = this.plantsToDisplayFilter.filter((plant) => plant.nom.toLocaleLowerCase().includes(this.userInput.toLocaleLowerCase()))
    }
    if(this.tabNombreDeGouttesFilter.length < 4) {
      this.plantsToDisplayFilter = this.plantsToDisplayFilter.filter((plant) => !this.tabNombreDeGouttesFilter.includes(plant.arrosage))
    }
    if(this.tabCategoriesFilter.length < 6) {
      this.plantsToDisplayFilter = this.plantsToDisplayFilter.filter((plant) => !this.tabCategoriesFilter.includes(plant.categorie))
    }
    if(this.tabEtatMeteoFilter.length < 3) {
      this.plantsToDisplayFilter = this.plantsToDisplayFilter.filter((plant) => !this.tabEtatMeteoFilter.includes(plant.soleil))
    }
    return this.plantsToDisplayFilter
  }

  valeurDuBouttonAlpha(value:string) {
    this.countAlpha === 2 ? this.countAlpha = 0 : this.countAlpha ++;
    console.log(this.countAlpha);
    const tabTriAlpha = this.onUserInteractionFiltre()
    if (this.countAlpha === 0) {
      this.plantsToDisplayFilter = this.onUserInteractionFiltre();
    }
    if (this.countAlpha === 1) {
      function comparePlants(plantA: { nom: string }, plantB: { nom: string }) {
        return plantA.nom.localeCompare(plantB.nom);
      } 
      this.plantsToDisplayFilter = tabTriAlpha.sort(comparePlants)
    } else if (this.countAlpha === 2) {
      function comparePlants(plantA: { nom: string }, plantB: { nom: string }) {
        return -1 * plantA.nom.localeCompare(plantB.nom);
      } 
      this.plantsToDisplayFilter = tabTriAlpha.sort(comparePlants)
    }
    console.log(this.plantsToDisplayFilter);
  }

  valeurDuBouttonArrosage(value:string) {
    console.log(value);
  }
  
  valeurDuBouttonEnsoleillement(value:string) {
    console.log(value);
  }

}
