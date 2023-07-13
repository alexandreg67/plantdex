import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input()
  categoriesRecu!: string[];

  checkboxValues: boolean[] = []


  constructor() {
  }

  ngOnInit() {

  }

  onCheckboxChange(index: number) {
  this.checkboxValues[index] = !this.checkboxValues[index];
  console.log(this.checkboxValues[index]);
  console.log(this.categoriesRecu[index]);
  }



}


