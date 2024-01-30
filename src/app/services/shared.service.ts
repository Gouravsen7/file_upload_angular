import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { VisualizationData } from '@app/components/shared/svg-bar/svg.interface';

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  private fetchDataSubject = new Subject<void>();
  private cachedDataSubject = new BehaviorSubject<VisualizationData[]>([]);
  cachedData$ = this.cachedDataSubject.asObservable();
  fetchData$ = this.fetchDataSubject.asObservable();

  fetchSvgData() {
    this.fetchDataSubject.next();
  }

  storeCachedSvgData(value: VisualizationData[]) {
    this.cachedDataSubject.next(value);
  }
}
