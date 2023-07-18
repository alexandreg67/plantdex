import { Pipe, PipeTransform } from '@angular/core';
import { Plant } from './models/plant';


@Pipe({
  name: 'filterPlants'
})
export class FilterPlantsPipe implements PipeTransform {


  transform(plant: Plant): any {
    return plant.categorie === 'bonsaïs';
  }

}
