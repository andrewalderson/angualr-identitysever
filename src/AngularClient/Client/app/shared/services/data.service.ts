import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';
import 'rxjs/Rx'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthService } from './auth.service';

@Injectable()
export class DataService {

    constructor(private http: Http, private authService: AuthService) { }

    get(url: string): Observable<Response> {
        let options = this.setAuthRequestOptions();

        return this.http.get(url, options).map(
            (res: Response) => {
                return res;
            }).catch(this.handleError);
    }

    post(url: string, data: any): Observable<Response> {
        let options = this.setAuthRequestOptions();

        return this.http.post(url, data, options).map(
            (res: Response) => {
                return res;
            }).catch(this.handleError);
    }

    put(url: string, data: any): Observable<Response> {
        let options = this.setAuthRequestOptions();

        return this.http.put(url, data, options).map(
            (res: Response) => {
                return res;
            }).catch(this.handleError);
    }

    delete(url: string) {
        let options = this.setAuthRequestOptions();

        this.http.delete(url, options).subscribe((res) => {
            console.log('deleted');
        });
    }

    private setAuthRequestOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
        if (this.authService) {
            if (!options.headers) {
                options.headers = new Headers();
            }
            options.headers.append('Authorization', 'Bearer ' + this.authService.accessToken);
        }
        return options;
    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'server error');
    }
}
