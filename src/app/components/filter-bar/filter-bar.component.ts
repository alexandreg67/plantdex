import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input()
  categoriesRecu!: string[];

  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newGoutteEvent = new EventEmitter<number>();
  @Output() newSansFiltreEvent = new EventEmitter<boolean>();

  imageGoutteEau1:string = "../../../assets/goutte-de-sang.png"
  imageGoutteEau2:string = "../../../assets/goutte-de-sang.png"
  imageGoutteEau3:string = "../../../assets/goutte-de-sang.png"

  nombreDeGoutte: number = 0;

  sansFiltre!: boolean

  constructor() {
  }

  ngOnInit() {

  }


  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    // console.log('la valeur emit : ', value);
  }

  changeGoutteEau1(test: any) {

    const target = test.target as HTMLInputElement;
    // console.log(target.checked);
    if (target.checked) {
      this.imageGoutteEau1 = '../../../assets/goutte-deau.png'
      this.nombreDeGoutte += 1
    }else {
      this.imageGoutteEau1 = '../../../assets/goutte-de-sang.png'
      this.nombreDeGoutte -= 1
    }
    this.newGoutteEvent.emit(this.nombreDeGoutte)
  }

  changeGoutteEau2(test: any) {
    const target = test.target as HTMLInputElement;
    if (target.checked) {
      this.imageGoutteEau2 = '../../../assets/goutte-deau.png'
      this.nombreDeGoutte += 1
    }else {
      this.imageGoutteEau2= '../../../assets/goutte-de-sang.png'
      this.nombreDeGoutte -= 1
    }
    this.newGoutteEvent.emit(this.nombreDeGoutte)
  }

  changeGoutteEau3(test: any) {
    const target = test.target as HTMLInputElement;
    if (target.checked) {
      this.imageGoutteEau3 = '../../../assets/goutte-deau.png'
      this.nombreDeGoutte += 1
    }else {
      this.imageGoutteEau3 = '../../../assets/goutte-de-sang.png'
      this.nombreDeGoutte -= 1
    }
    this.newGoutteEvent.emit(this.nombreDeGoutte)
  }

  changeSansFiltre(status: any) {
    const target = status.target as HTMLInputElement;
    console.log(target.checked);
    this.newSansFiltreEvent.emit(target.checked)
  }

}


