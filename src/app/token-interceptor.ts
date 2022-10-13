import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { BehaviorSubject, catchError, filter, Observable, share, switchMap, take, throwError } from "rxjs";
import { LoginResponsePayload } from "./component/auth/login/login-response.payload";
import { AuthService } from "./service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService, private localStorage: LocalStorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const jwtToken = this.authService.getJwtToken();

        if(jwtToken) {
            req = this.addToken(req, jwtToken);
            return next.handle(this.addToken(req, jwtToken)).pipe(
                catchError(error => {
                    if(error instanceof HttpErrorResponse && error.status === 403) {
                        return this.authService.refreshToken().pipe(
                            switchMap((refreshTokenResponse: LoginResponsePayload) => {
                                return next.handle(this.addToken(req, refreshTokenResponse.accessToken))
                            })
                        )
                    } else {
                        return throwError(() => new Error(error))
                    }
                })
            )
        }
        return next.handle(req);
    }


    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
        });
    }
}