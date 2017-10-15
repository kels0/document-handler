"use strict";
// Angular modules
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

// Application modules
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContractPageComponent } from './contract-page/contract-page.component';
import { TopbarComponent } from "./top-bar/top-bar.component";
import { HelperService } from "./services/helper.service"
import { HttpService } from "./services/http.service"
import { routing } from "./app.routing";
import { OrderBy } from "./pipes/orderBy.pipe";
import { ListItemComponent } from './list-item/list-item.component';
import { AddNewComponent } from './dashboard/add-new/add-new.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        TopbarComponent,
        OrderBy,
        ContractPageComponent,
        ListItemComponent,
        AddNewComponent,
    ],
    providers: [
        HelperService,
        HttpService,
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
