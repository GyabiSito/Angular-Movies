import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CardMovieComponent } from "../card-movie/card-movie.component";
import { MovieService } from '../../services/movie.service';
import { debounceTime, distinct, filter, fromEvent, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { IMovie } from '../../interfaces/movies';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CardMovieComponent, AsyncPipe],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  movies$!:Observable<IMovie[]>
  // movieSubscription!: Subscription;
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput!: ElementRef;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movies$ = fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup').pipe( // Escuchar cada caracter del usuario
      map((event: Event) => { //Mapear el evento para obtener el valor del input
        const SearchTerm = (event.target as HTMLInputElement).value;
        return SearchTerm;// Encontrar el termino del usuario
      }),
      filter((SearchTerm: string) => SearchTerm.length > 3), //Filtrar los terminos que tengan menos de 3 caracteres
      debounceTime(500), //Esperar 1 segundo para realizar la petición
      distinct(), //Evitar que se realicen peticiones duplicadas
      switchMap((SearchTerm: string) => this.movieService.getMovies(SearchTerm)), //Cambiar el observable para obtener los datos
      // tap((SearchTerm: string) => console.log(SearchTerm))
    )
    //En caso de no usar pipe async, se puede usar el subscribe. El pipe async se encarga de desuscribirse automaticamente
    // .subscribe((movies: IMovie[]) => {
    //   this.movies = movies || [];
    // });
  }
  // getMovies(searchTerm:string){
  //   this.movieService.getMovies(searchTerm).subscribe((movies)=>{
  //     this.movies = movies || [];
  //   })
  // }
  ngOnDestroy(): void {
    // this.movieSubscription.unsubscribe();
  }

}
