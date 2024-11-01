import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../../interfaces/movies';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  imports: [],
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.css'
})
export class CardMovieComponent implements OnInit {
  @Input('movie') movie:IMovie={
    Title: '',
    Year: '',
    Type: '',
    Poster: '',
    imdbID: ''
  };

  ngOnInit(): void {

  }

  getImagen(): any{
    return this.movie.Poster !== 'N/A' ? this.movie.Poster : 'https://placehold.co/600';
  }
}
