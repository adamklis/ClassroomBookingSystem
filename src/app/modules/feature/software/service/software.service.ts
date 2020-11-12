import { ISoftware } from './../interface/software.interface';
import { Injectable } from '@angular/core';
import * as uuidGen from 'uuid';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  private SOFTWARE: Array<ISoftware> = [
    {
      uuid: '1',
      name: 'Microsoft Visual Studio 2010',
      quantity: 200,
      validFrom: new Date('2019-01-01'),
      validTo: new Date('2020-12-31')
    },
    {
      uuid: '2',
      name: 'Microsoft SQL Server 2012',
      quantity: 50,
      validFrom: new Date('2019-01-01'),
      validTo: new Date('2020-12-31')
    },
    {
      uuid: '3',
      name: 'Microsoft Office 2010',
      quantity: 50,
      validFrom: new Date('2019-01-01'),
      validTo: new Date('2020-12-31')
    },
    {
      uuid: '4',
      name: 'Adobe Photoshop CS6',
      quantity: 20,
      validFrom: null,
      validTo: new Date('2020-12-31')
    },
    {
      uuid: '5',
      name: 'Audacity2',
      quantity: 100,
      validFrom: new Date('2019-01-01'),
      validTo: null
    },
    {
      uuid: '6',
      name: 'Oracle VM VirtualBox',
      quantity: 300,
      validFrom: null,
      validTo: null
    },
  ];

  constructor() { }

  public getSoftwareList(): Observable<ISoftware[]> {
    return of(this.SOFTWARE);
  }

  public getSoftware(uuid: string): Observable<ISoftware> {
    return of(this.SOFTWARE.find(user => user.uuid === uuid));
  }

  public addSoftware(software: ISoftware): void {
    software.uuid = uuidGen.v4();
    console.log('Add software:');
    console.log(software);
    this.SOFTWARE.push(software);
  }

  public saveSoftware(software: ISoftware): void {
    console.log('Save software:');
    console.log(software);
    const softwareIndex = this.SOFTWARE.findIndex(oldSoftware => oldSoftware.uuid === software.uuid);
    this.SOFTWARE[softwareIndex] = software;
  }

  public deleteSoftware(uuid: string): void {
    console.log('Delete software:');
    console.log(uuid);
    this.SOFTWARE = this.SOFTWARE.filter(software => software.uuid !== uuid);
  }
}
