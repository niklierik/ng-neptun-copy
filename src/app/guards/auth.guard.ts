import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly user: UserService,
        private readonly router: Router,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.user.isLoggedIn) {
            return true;
        }
        this.router.navigate(["/login"]);
        return false;
    }
}
