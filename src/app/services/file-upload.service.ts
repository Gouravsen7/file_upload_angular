import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class FileUploadService {

  private baseUrl = environment.baseUrl;
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  uploadFile(data: any): Observable<any> {
    const uploadUrl = `${this.baseUrl}/file_upload`;
    return this.http.post(uploadUrl, data);
  }

  upLoadFileHoleDetails(data: any): Observable<any> {
    const uploadUrl = `${this.baseUrl}/data_visualization`;
    return this.http.post(uploadUrl, data);
  }

  getData(page: number): Observable<any[]> {
    const params = new HttpParams().set('page', page);
    return this.http.get<any[]>(`${this.baseUrl}/data_visualization`, { params });
  }

  setData(data: any): void {
    this.dataSubject.next(data);
  }
}
