import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-group-button',
  templateUrl: './group-button.component.html',
  styleUrls: ['./group-button.component.css']
})
export class GroupButtonComponent {
  @Output() etatDuBouttonAlpha = new EventEmitter<string>()
}
