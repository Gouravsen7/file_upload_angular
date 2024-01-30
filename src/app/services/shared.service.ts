import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private fetchDataSubject = new Subject<void>();
  private cachedDataSubject = new BehaviorSubject<any[]>([]);
  cachedData$ = this.cachedDataSubject.asObservable();
  fetchData$ = this.fetchDataSubject.asObservable();

  fetchSvgData() {
    this.fetchDataSubject.next();
  }

  storeCachedSvgData(value:any[]) {
    this.cachedDataSubject.next(value);
  }
}
