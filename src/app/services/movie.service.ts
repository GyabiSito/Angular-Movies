import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/api-response';
import { IMovie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  //key 839c2ed5

  private API_URL='http://www.omdbapi.com/?apikey=839c2ed5';

  constructor(private http:HttpClient) { }

  getMovies(searchTerm:string): Observable<IMovie[]>{
    return this.http.get<IApiResponse>(`${this.API_URL}&s=${searchTerm}`).pipe(
      map(response => {
        return response.Search || [];
      })
    );
    
  }
}
