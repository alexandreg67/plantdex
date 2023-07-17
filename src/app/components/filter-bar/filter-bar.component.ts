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

  constructor() {
  }

  ngOnInit() {

  }


  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    // console.log('la valeur emit : ', value);
  }

}


