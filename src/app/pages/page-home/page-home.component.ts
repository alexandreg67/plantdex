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
  countArrosage!: number;
  countEnsoleillement!: number;

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
      this.countArrosage = 0;
      this.countEnsoleillement = 0;

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

  triAlpha(value:number) {
    console.log("tri alpa value : ", value);
    
    const tabTriAlpha = this.onUserInteractionFiltre()
    if (value === 0) {
      this.plantsToDisplayFilter = this.onUserInteractionFiltre();
    }
    if (value === 1) {
      function comparePlants(plantA: { nom: string }, plantB: { nom: string }) {
        return plantA.nom.localeCompare(plantB.nom);
      } 
      this.plantsToDisplayFilter = tabTriAlpha.sort(comparePlants)
    } else if (value === 2) {
      function comparePlants(plantA: { nom: string }, plantB: { nom: string }) {
        return -1 * plantA.nom.localeCompare(plantB.nom);
      } 
      this.plantsToDisplayFilter = tabTriAlpha.sort(comparePlants)
    }
  }

  triArrosage(value:number) {
    console.log("tri arrosage value : ",value);
    const tabTriArrosage = this.onUserInteractionFiltre()
    if (value === 0) {
      this.plantsToDisplayFilter = this.onUserInteractionFiltre();
    }
    if (value === 1) {
      this.plantsToDisplayFilter = tabTriArrosage.sort((plantA, plantB) =>  plantA.arrosage - plantB.arrosage)
    } else if (value === 2) {
      this.plantsToDisplayFilter = tabTriArrosage.sort((plantA, plantB) => plantB.arrosage - plantA.arrosage)
    }
  }

  triEnsoleillement(value:number) {
    console.log("tri ensoleillement value : ", value);
  }

  valeurDuBoutton(value:string) {
    switch (value) {
      case "Alpha":
        this.countAlpha === 2 ? this.countAlpha = 0 : this.countAlpha ++;
        this.countArrosage = 0;
        this.countEnsoleillement = 0;
        this.triEnsoleillement(this.countEnsoleillement)
        this.triArrosage(this.countArrosage)
        this.triAlpha(this.countAlpha)
        break;
      case "Arrosage":
        this.countArrosage === 2 ? this.countArrosage = 0 : this.countArrosage ++;
        this.countAlpha = 0;
        this.countEnsoleillement = 0;
        this.triEnsoleillement(this.countEnsoleillement)
        this.triAlpha(this.countAlpha)
        this.triArrosage(this.countArrosage)
        break;
      case "Ensoleillement":
        this.countEnsoleillement === 2 ? this.countEnsoleillement = 0 : this.countEnsoleillement++
        this.countAlpha = 0;
        this.countArrosage = 0;
        this.triAlpha(this.countAlpha);
        this.triArrosage(this.countArrosage);
        this.triEnsoleillement(this.countEnsoleillement)
        break;
    
      default:
        console.log("default dans le switch");
        
        break;
    }
  }

}
