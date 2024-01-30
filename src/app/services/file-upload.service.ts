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
    const uploadUrl = `${this.baseUrl}/hole`;
    const formData = new FormData();
    formData.append('file', data);
    return this.http.post(uploadUrl, formData);
  }

}
