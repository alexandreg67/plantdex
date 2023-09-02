import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input() categories!: string[];
  @Input() nombreDeGouttesRecu!: number[];
  @Input() tabEtatMeteoRecu!: string[];

  @Output() filterEvent = new EventEmitter<{ type: string, value: any }>(); // On émet un évènement lorsqu'un filtre est appliqué

  imageSansEau: string = "../../../assets/goutte-de-sang.png";
  imageGoutteEau: string = "../../../assets/goutte-deau.png";
  soleilVide: string = "../../../assets/soleil.png"
  soleilJaune: string = "../../../assets/soleil_jaune.png"

  constructor() { }

  ngOnInit() {
    
  }

  applyFilter(type: string, value: any) { 
    this.filterEvent.emit({ type, value }); // On émet un évènement lorsqu'un filtre est appliqué
  }
}