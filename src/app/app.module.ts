"use strict";
// Angular modules
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

// Application modules
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TopbarComponent } from "./top-bar/top-bar.component";
import { HelperService } from "./services/helper.service"
import { StationService } from "./services/station.service"
import { HttpService } from "./services/http.service"
import { routing } from "./app.routing";
import { OrderBy } from "./pipes/orderBy.pipe";
import { SuntopComponent } from "./suntop/suntop.component";
import { SunLeagueComponent } from "./sun-league/sun-league.component";
import { StationCardComponent } from "./suntop/station-card/station-card.component";
import { StationDetailsComponent } from "./station-details/station-details.component";
import { AgmCoreModule } from "@agm/core";
import { AuthorPageComponent } from "./author-page/author-page.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyC43KSt2dFbEO1Jljg4z9mRAK9dcZJXIZA"
        })
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        TopbarComponent,
        OrderBy,
        SuntopComponent,
        SunLeagueComponent,
        StationCardComponent,
        StationDetailsComponent,
        AuthorPageComponent
    ],
    providers: [
        HelperService,
        HttpService,
        StationService
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
