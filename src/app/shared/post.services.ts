import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbResponse, Post} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostServices {
  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<any> {
    return this.http.post(`${environment.FbDbUrl}/post.json`, post)
        .pipe(
            map((response: FbResponse) => {
                  return {
                    ...post,
                    id: response.name,
                    date: new Date(post.date)
                  };
                }
            )
        );
  }
  getAll(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.FbDbUrl}/post.json`)
        .pipe(
            map((response: {[key: string]: any}) => {

                return response ? Object.keys(response).map((key) => (
                    {...response[key], id: key, date: new Date(response[key].date)}
                )) : [];
            })
        );
  }
  getBuId(id: string): Observable<Post> {
    return this.http.get(`${environment.FbDbUrl}/post/${id}.json`)
        .pipe(
            map((post: any) => {
                  return {
                    ...post,
                    id,
                    date: new Date(post.date)
                  };
                }
            )
        );
  }
  update(post: Post | any): Observable<Post>{
    return this.http.patch<Post>(`${environment.FbDbUrl}/post/${post.id}.json`, post);
  }
  removePost(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.FbDbUrl}/post/${id}.json`);
  }
}
