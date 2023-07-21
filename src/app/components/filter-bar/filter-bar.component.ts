import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input() categories!: string[];
  @Input() nombreDeGouttesRecu!: number[]
  @Input() tabEtatMeteoRecu!: string[];

  @Output() newCategoriesEvent = new EventEmitter<string>();
  @Output() newGouttesEvent = new EventEmitter<number>();
  @Output() newSoleilEvent  = new EventEmitter<string>();

  imageSansEau:string = "../../../assets/goutte-de-sang.png";
  imageGoutteEau:string = "../../../assets/goutte-deau.png";
  soleilVide:string = "../../../assets/soleil.png"
  soleilJaune:string = "../../../assets/soleil_jaune.png"



  constructor() {
  }

  ngOnInit() {
    //  console.log("je suis dans le ngoninit de l'enfant : ", this.categories);
    //  console.log(this.nombreDeGouttesRecu);
    //  console.log(this.tabEtatMeteoRecu);
  }

  applyFiltersCategories(value:string) {
    this.newCategoriesEvent.emit(value)
  }
  applyFiltersGouttes(value:number) {
    this.newGouttesEvent.emit(value)
  }
  applyFiltersSoleil(value:string) {
    this.newSoleilEvent.emit(value)
  }

}


