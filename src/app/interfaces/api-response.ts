import { IMovie } from "./movies";

export interface IApiResponse{
    Search: IMovie[];
    totalResults: string;
    Response: string;
}