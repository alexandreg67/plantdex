import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  originalPlants: Plant[] = [];

  plantsToDisplay: Plant[] = [];
  plantsToDisplayFilter: Plant[] = [];

  categories: string[] = [];
  nombreDeGouttes: number[] = [0, 1, 2, 3];
  tabEtatMeteo: string[] = ["peu", "moyen", "beaucoup"];

  tabCategoriesFilter: string[] = [];
  tabNombreDeGouttesFilter: number[] = [];
  tabEtatMeteoFilter: string[] = [];

  userInput: string = '';

  countAlpha = 0;
  countArrosage = 0;
  countEnsoleillement = 0;

  constructor(private plantService: PlantService) { }

  ngOnInit(): void {
    this.plantService.getPlants().subscribe((data: Plant[]) => {
      this.plantsToDisplay = data;
      this.originalPlants = [...data];
      this.updateFilteredList();
      this.categories = [... new Set(this.plantsToDisplay.map(e => e.categorie))];
      this.resetFilters();
    });
  }

  resetFilters(): void {
    this.tabCategoriesFilter = [];
    this.tabNombreDeGouttesFilter = [];
    this.tabEtatMeteoFilter = [];
  }

 toggleFilter(filterList: any[], filterValue: any) {
    const index = filterList.indexOf(filterValue);
    if (index > -1) {
        filterList.splice(index, 1);
    } else {
        filterList.push(filterValue);
    }
    console.log("Filtres mis à jour: ", filterList);
    this.updateFilteredList();
  }

  onEnterSearch(resultUserSearch: string): void {
    this.userInput = resultUserSearch;
    this.updateFilteredList();
  }

  updateFilteredList(): void {
    let filtered = [...this.plantsToDisplay];

    if (this.userInput) {
        filtered = filtered.filter(plant => plant.nom.toLowerCase().includes(this.userInput.toLowerCase()));
    }

    if (this.tabNombreDeGouttesFilter.length) {
        filtered = filtered.filter(plant => this.tabNombreDeGouttesFilter.includes(plant.arrosage));
    }

    if (this.tabCategoriesFilter.length) {
        filtered = filtered.filter(plant => this.tabCategoriesFilter.includes(plant.categorie));
    }

    if (this.tabEtatMeteoFilter.length) {
        filtered = filtered.filter(plant => this.tabEtatMeteoFilter.includes(plant.soleil));
    }

    this.plantsToDisplayFilter = filtered;
  }

  sortArray<T>(arr: T[], compareFunction: (a: T, b: T) => number): T[] {
    return arr.slice().sort(compareFunction);
  }

  triAlpha(): void {
    if (this.countAlpha === 0) {
        this.plantsToDisplayFilter = [...this.originalPlants];
        this.updateFilteredList();
        return;
    }

    const compareFuncs = [
      (a: Plant, b: Plant) => a.nom.localeCompare(b.nom),  // Ascendant
      (a: Plant, b: Plant) => b.nom.localeCompare(a.nom)   // Descendant
    ];

    this.plantsToDisplayFilter = this.sortArray(this.plantsToDisplayFilter, compareFuncs[this.countAlpha - 1]);
  }

  triArrosage(): void {
    if (this.countArrosage === 0) {
        this.plantsToDisplayFilter = [...this.originalPlants];
        this.updateFilteredList();
        return;
    }
    const compareFuncs = [
      (a: Plant, b: Plant) => 0,
      (a: Plant, b: Plant) => a.arrosage - b.arrosage,
      (a: Plant, b: Plant) => b.arrosage - a.arrosage
    ];

    this.plantsToDisplayFilter = this.sortArray(this.plantsToDisplayFilter, compareFuncs[this.countArrosage]);
  }

  handleFilterEvent(event: { type: string, value: any }): void {
    switch(event.type) {
        case 'categorie':
            this.toggleFilter(this.tabCategoriesFilter, event.value);
            break;
        case 'goutte':
            this.toggleFilter(this.tabNombreDeGouttesFilter, event.value);
            break;
        case 'etatMeteo':
            this.toggleFilter(this.tabEtatMeteoFilter, event.value);
            break;
        default:
            console.error(`Type de filtre inconnu: ${event.type}`);
    }
  }   

  // ... autres fonctions de tri ...

  valeurDuBoutton(value: string): void {
    switch (value) {
      case "Alpha":
        this.countAlpha = (this.countAlpha + 1) % 3;
        this.triAlpha();
        break;
      case "Arrosage":
        this.countArrosage = (this.countArrosage + 1) % 3;
        this.triArrosage();
        break;
      case "Ensoleillement":
        this.countEnsoleillement = (this.countEnsoleillement + 1) % 3;
        this.triEnsoleillement();
        break;
      default:
        console.log("default dans le switch");
        break;
    }
  }
  triEnsoleillement(): void {
    if (this.countEnsoleillement === 0) {
        this.plantsToDisplayFilter = [...this.originalPlants];
        this.updateFilteredList();
        return;
    }
    
    const order = ['peu', 'moyen', 'beaucoup']; // ordre d'ensoleillement
    const compareFuncs = [
      (a: Plant, b: Plant) => 0, // état initial, pas de tri
      (a: Plant, b: Plant) => order.indexOf(a.soleil) - order.indexOf(b.soleil), // croissant
      (a: Plant, b: Plant) => order.indexOf(b.soleil) - order.indexOf(a.soleil)  // décroissant
    ];

    this.plantsToDisplayFilter = this.sortArray(this.plantsToDisplayFilter, compareFuncs[this.countEnsoleillement]);
  }

}