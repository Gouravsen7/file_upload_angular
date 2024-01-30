import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  uploadFile(data: any): Observable<any> {
    const uploadUrl = `${this.baseUrl}/file_upload`;
    return this.http.post(uploadUrl, data);
  }

  upLoadFileHoleDetails(data: any): Observable<any>{
    const uploadUrl = `${this.baseUrl}/data_visualization`;
    return this.http.post(uploadUrl, data,);
  }

  getData(page: number): Observable<any[]> {
    const params = { page: page.toString() };
    return this.http.get<any[]>(`${this.baseUrl}/data_visualization`, { params });
  }
}
