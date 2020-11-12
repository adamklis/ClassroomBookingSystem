import { IAppliance } from './../interface/appliance.interface';
import { Injectable } from '@angular/core';
import * as uuidGen from 'uuid';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  private APPLIANCES: Array<IAppliance> = [
    {
      uuid: '1',
      name: 'Notebook Lenovo L560',
      quantity: 100
    },
    {
      uuid: '2',
      name: 'Projektor Dell',
      quantity: 10
    },
    {
      uuid: '3',
      name: 'Monitor Samsung 28"',
      quantity: 50
    },
    {
      uuid: '4',
      name: 'Tablica interaktywna',
      quantity: 5
    }
  ];

  constructor() { }

  public getAppliances(): Observable<IAppliance[]> {
    return of(this.APPLIANCES);
  }

  public getAppliance(uuid: string): Observable<IAppliance> {
    return of(this.APPLIANCES.find(appliance => appliance.uuid === uuid));
  }

  public addAppliance(appliance: IAppliance): void {
    appliance.uuid = uuidGen.v4();
    console.log('Add appliance:');
    console.log(appliance);
    this.APPLIANCES.push(appliance);
  }

  public saveAppliance(appliance: IAppliance): void {
    console.log('Save appliance:');
    console.log(appliance);
    const applianceIndex = this.APPLIANCES.findIndex(oldAppliance => oldAppliance.uuid === appliance.uuid);
    this.APPLIANCES[applianceIndex] = appliance;
  }

  public deleteAppliance(uuid: string): void {
    console.log('Delete appliance:');
    console.log(uuid);
    this.APPLIANCES = this.APPLIANCES.filter(appliance => appliance.uuid !== uuid);
  }
}
