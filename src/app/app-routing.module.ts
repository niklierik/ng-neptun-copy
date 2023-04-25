import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    {
        path: "register",
        loadChildren: () =>
            import("./pages/register/register.module").then(
                (m) => m.RegisterModule,
            ),
    },
    {
        path: "login",
        loadChildren: () =>
            import("./pages/login/login.module").then((m) => m.LoginModule),
    },
    {
        path: "home",
        loadChildren: () =>
            import("./pages/home/home.module").then((m) => m.HomeModule),
        canActivate: [AuthGuard],
    },
    {
        path: "not-found",
        loadChildren: () =>
            import("./pages/not-found/not-found.module").then(
                (m) => m.NotFoundModule,
            ),
    },
    {
        path: "user",
        loadChildren: () =>
            import("./pages/user/user.module").then((m) => m.UserModule),
        canActivate: [AuthGuard],
    },
    {
        pathMatch: "full",
        path: "",
        redirectTo: "home",
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
