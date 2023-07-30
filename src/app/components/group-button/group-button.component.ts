import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-group-button',
  templateUrl: './group-button.component.html',
  styleUrls: ['./group-button.component.css']
})
export class GroupButtonComponent {

  @Input() countAlpha!:number;
  @Input() countArrosage!:number;
  @Input() countEnsoleillement!:number;

  @Output() etatDuBoutton = new EventEmitter<string>()
  
}
