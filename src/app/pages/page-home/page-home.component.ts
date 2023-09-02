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
    this.plantService.getPlants().subscribe((data: Plant[]) => { // On récupère les plantes
      this.plantsToDisplay = data;
      this.originalPlants = [...data];
      this.updateFilteredList(); // On met à jour la liste des plantes à afficher
      this.categories = [... new Set(this.plantsToDisplay.map(e => e.categorie))];
      this.resetFilters(); // On réinitialise les filtres
    });
  }

  resetFilters(): void { // On réinitialise les filtres
    this.tabCategoriesFilter = [];
    this.tabNombreDeGouttesFilter = [];
    this.tabEtatMeteoFilter = [];
  }

 toggleFilter(filterList: any[], filterValue: any) { // On ajoute ou on retire un filtre
    const index = filterList.indexOf(filterValue); // On regarde si le filtre est déjà présent dans la liste des filtres
    if (index > -1) { // Si le filtre est déjà présent dans la liste des filtres
        filterList.splice(index, 1);
    } else { // Si le filtre n'est pas présent dans la liste des filtres
        filterList.push(filterValue); 
    }
    console.log("Filtres mis à jour: ", filterList);
    this.updateFilteredList(); // On met à jour la liste des plantes à afficher
  }

  onEnterSearch(resultUserSearch: string): void { //
    this.userInput = resultUserSearch; // On récupère la recherche de l'utilisateur
    this.updateFilteredList(); // On met à jour la liste des plantes à afficher
  }

  updateFilteredList(): void {
    let filtered = [...this.plantsToDisplay]; // On récupère la liste des plantes à afficher

    if (this.userInput) { // Si l'utilisateur a fait une recherche
        filtered = filtered.filter(plant => plant.nom.toLowerCase().includes(this.userInput.toLowerCase()));
    }

    if (this.tabNombreDeGouttesFilter.length) { // Si l'utilisateur a sélectionné un filtre
        filtered = filtered.filter(plant => this.tabNombreDeGouttesFilter.includes(plant.arrosage));
    }

    if (this.tabCategoriesFilter.length) { // Si l'utilisateur a sélectionné un filtre
        filtered = filtered.filter(plant => this.tabCategoriesFilter.includes(plant.categorie));
    }

    if (this.tabEtatMeteoFilter.length) { // Si l'utilisateur a sélectionné un filtre
        filtered = filtered.filter(plant => this.tabEtatMeteoFilter.includes(plant.soleil));
    }

    this.plantsToDisplayFilter = filtered; // On met à jour la liste des plantes à afficher
  }

  sortArray<T>(arr: T[], compareFunction: (a: T, b: T) => number): T[] { // On trie un tableau
    return arr.slice().sort(compareFunction); // On retourne le tableau trié
  }

  triAlpha(): void { // On trie les plantes par ordre alphabétique
    if (this.countAlpha === 0) {
        this.plantsToDisplayFilter = [...this.originalPlants];
        this.updateFilteredList();
        return;
    }

    const compareFuncs = [ // On définit les fonctions de comparaison
      // (a: Plant, b: Plant) => 0, // état initial, pas de tri
      (a: Plant, b: Plant) => a.nom.localeCompare(b.nom),  // Ascendant
      (a: Plant, b: Plant) => b.nom.localeCompare(a.nom)   // Descendant
    ];
    // On trie les plantes par ordre alphabétique
    this.plantsToDisplayFilter = this.sortArray(this.plantsToDisplayFilter, compareFuncs[this.countAlpha - 1]);
  }

  triArrosage(): void { // On trie les plantes par ordre d'arrosage
    if (this.countArrosage === 0) {
        this.plantsToDisplayFilter = [...this.originalPlants];
        this.updateFilteredList();
        return;
    }

    const compareFuncs = [ 
      // On définit les fonctions de comparaison
      (a: Plant, b: Plant) => 0, // état initial, pas de tri
      (a: Plant, b: Plant) => a.arrosage - b.arrosage, // croissant
      (a: Plant, b: Plant) => b.arrosage - a.arrosage // décroissant
    ];
    // On trie les plantes par ordre d'arrosage
    this.plantsToDisplayFilter = this.sortArray(this.plantsToDisplayFilter, compareFuncs[this.countArrosage]);
  }

  // ... autres fonctions de tri ...
  handleFilterEvent(event: { type: string, value: any }): void { // On gère les filtres
    switch(event.type) { // On regarde le type de filtre
        case 'categorie': // Si le filtre est une catégorie
            this.toggleFilter(this.tabCategoriesFilter, event.value); // On ajoute ou on retire le filtre
            break;
        case 'goutte': // Si le filtre est un nombre de gouttes
            this.toggleFilter(this.tabNombreDeGouttesFilter, event.value); // On ajoute ou on retire le filtre
            break;
        case 'etatMeteo': // Si le filtre est un état météo
            this.toggleFilter(this.tabEtatMeteoFilter, event.value); // On ajoute ou on retire le filtre
            break;
        default:
            console.error(`Type de filtre inconnu: ${event.type}`);
    }
  }   

  // ... autres fonctions de tri ...

  valeurDuBoutton(value: string): void { // On gère les boutons de tri
    switch (value) {
      case "Alpha": // Si le bouton est un tri par ordre alphabétique
        this.countAlpha = (this.countAlpha + 1) % 3; // On incrémente le compteur
        this.triAlpha(); // On trie les plantes par ordre alphabétique
        break;
      case "Arrosage": // Si le bouton est un tri par ordre d'arrosage
        this.countArrosage = (this.countArrosage + 1) % 3; // On incrémente le compteur
        this.triArrosage(); // On trie les plantes par ordre d'arrosage
        break;
      case "Ensoleillement": // Si le bouton est un tri par ordre d'ensoleillement
        this.countEnsoleillement = (this.countEnsoleillement + 1) % 3; // On incrémente le compteur
        this.triEnsoleillement(); // On trie les plantes par ordre d'ensoleillement
        break;
      default:
        console.log("default dans le switch");
        break;
    }
  }
  triEnsoleillement(): void { // On trie les plantes par ordre d'ensoleillement
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