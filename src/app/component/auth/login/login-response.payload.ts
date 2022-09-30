export class LoginResponsePayload {

    accessToken: string;
    refreshToken: string;
    username: string;
    expiresAt: Date;

    constructor(accessToken:string, refreshToken:string, username: string, expiresAt: Date) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.username = username;
        this.expiresAt = expiresAt;
    }
}