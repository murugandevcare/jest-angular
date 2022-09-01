import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	public currentUser: any;
	constructor(
	private http: HttpClient,
	) { }

	buildHeader(): any {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
			})
		};
		return httpOptions;
	}

	isLoggedIn(): boolean {
		try {
			let currentUser = localStorage.getItem('token');
			if (currentUser !== null) {
				return true
			}
			else {
				return false
			}
		} catch (e) {
			return false;
		}
	}

	login(oUser: any): Observable<any> {
		return this.http.post(`${environment.baseUrl}/api/auth/login`,JSON.stringify(oUser))
		// .pipe(
		// 	tap((response: any) => {
		// 		if (response.success) {
		// 			this.currentUser = response.message as any;
		// 			const userObj: any = {};
		// 			userObj.user = response.message;
		// 			userObj.token = response.token;

		// 			localStorage.setItem('currentUser', JSON.stringify(userObj));
		// 		}
		// 	}),
		// 	retry(3),
		// 	catchError(this.handleError)
		// );
	}

	logout(): void {
		this.currentUser = null;
		localStorage.removeItem('currentUser');
	}

	private handleError(err: any) {
		let errorMessage = '';
		if (err.error instanceof Error) {
			errorMessage = `An error occurred: ${err.error.message}`;
		} else {
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		console.error(errorMessage);
		return throwError(() => new Error(errorMessage));
	}

}
