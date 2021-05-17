import { Component, OnInit } from '@angular/core';
import { Observable, of, from, pipe } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular';

  ngOnInit() {
    // rxjs Operators:
    // 1. of

    const personalInfo: any = {
      name: 'Rajesh',
      Contact: '8328348050',
      place: 'visakhapatnam'
    };

    const personObj: Observable<String> = of(personalInfo);
    personObj.subscribe(data => {
      console.log(data);
    });

    // 2. From

    const promise: Promise<String> = Promise.resolve(personalInfo);
    const personPromise: Observable<any> = from(promise);
    personPromise.subscribe(data => {
      console.log(data);
    });

    const array = [1, 2, 3, 'Chris Evans', 'deadpool'];

    const rxjsOf: Observable<any> = of(array);
    rxjsOf.subscribe(arr => {
      console.log(arr);
    });

    const rxjsFrom: Observable<any> = from(array);
    rxjsFrom.subscribe(arr => {
      console.log(arr);
    });

    // 3. Pipe, Map

    const dataArray = ['Rajesh', 'mahesh', 'katherine', 'angular', 'React'];

    dataArray.forEach((item, i, arr) => {
      const newArray: any = of(arr[i]);

      newArray
        .pipe(map((data: any) => data.toUpperCase()))
        .subscribe(data => console.log(data));
    });

    const source: any = of(1, 2, 3, 4, 5);
    // transparently log values from source with 'tap'
    const example = source.pipe(
      tap(val => console.log(`BEFORE MAP: ${val}`)),
      map((val: any) => val + 10),
      tap(val => console.log(`AFTER MAP: ${val}`))
    );

    //'tap' does not transform values
    //output: 11...12...13...14...15
    const subscribe = example.subscribe(val => console.log(val));
  }
}
