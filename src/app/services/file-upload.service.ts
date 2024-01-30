import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = 'http://localhost:3000';
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();
  accessToken: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  uploadFile(data: any): Observable<any> {
    const uploadUrl = `${this.baseUrl}/file_upload`;
    const headers = this.getAuthorizationHeaders();
    return this.http.post(uploadUrl, data, { ...headers });
  }

  upLoadFileHoleDetails(data: any): Observable<any> {
    const uploadUrl = `${this.baseUrl}/data_visualization`;
    const headers = this.getAuthorizationHeaders();
    return this.http.post(uploadUrl, data, { ...headers });
  }

  getData(page: number): Observable<any[]> {
    const params = new HttpParams().set('page', page.toString());
    const headers = this.getAuthorizationHeaders();
    
    return this.http.get<any[]>(`${this.baseUrl}/data_visualization`, { params, ...headers });
  }

  setData(data: any): void {
    this.dataSubject.next(data);
  }

  private getAuthorizationHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'token': this.accessToken,
      }),
    };
  }
}
