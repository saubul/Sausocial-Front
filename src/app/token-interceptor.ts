import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { LoginResponsePayload } from "./component/auth/login/login-response.payload";
import { AuthService } from "./service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    constructor(public authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            
            if (req.url.indexOf('refresh') !== -1) {
                return next.handle(req);
            }
            const jwtToken = this.authService.getJwtToken();
            if(jwtToken) {
                
                req = this.addToken(req, jwtToken);
                return next.handle(req).pipe(
                    catchError(error => {
                        if(error instanceof HttpErrorResponse && error.status === 403) {
                            return this.handleAuthErrors(req, next);
                        } else {
                            console.log(error)
                            return throwError(() => {new Error(error)});
                        }
                    }))
            }
            
            return next.handle(req)
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
        });
    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponsePayload) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.accessToken);
                    return next.handle(this.addToken(req,
                        refreshTokenResponse.accessToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    }
}