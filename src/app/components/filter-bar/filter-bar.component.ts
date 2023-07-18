import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input() categoriesRecu!: string[];
  @Input() nombreDeGouttesRecu!: number[]

  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newGoutteEvent = new EventEmitter<number>();

  imageSansEau:string = "../../../assets/goutte-de-sang.png";
  imageGoutteEau:string = "../../../assets/goutte-deau.png";


  nombreDeGoutte!: number;

  sansFiltre!: boolean

  constructor() {
  }

  ngOnInit() {

  }


  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  onChangeNbrGouttes(value:number) {
    this.newGoutteEvent.emit(value)
  }

}


