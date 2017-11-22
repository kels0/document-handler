"use strict";
// Angular modules
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

// Application modules
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContractPageComponent } from './dashboard/contract-page/contract-page.component';
import { TopbarComponent } from "./top-bar/top-bar.component";
import { HelperService } from "./services/helper.service"
import { HttpService } from "./services/http.service"
import { ContractService } from "./services/contract.service"
import { FileService } from "./services/file.service"
import { routing } from "./app.routing";
import { OrderBy } from "./pipes/orderBy.pipe";
import { ListItemComponent } from './list-item/list-item.component';
import { NewItemComponent } from './dashboard/new-item-dialog/new-item.component';
import { EditComponent } from './dashboard/edit-dialog/edit.component';
import { SearchPageComponent } from './dashboard/search-page/search-page.component';
import { PreviewDocumentComponent } from './list-item/preview-document/preview-document.component';

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
        NewItemComponent,
        EditComponent,
        SearchPageComponent,
        PreviewDocumentComponent,
    ],
    providers: [
        HelperService,
        HttpService,
        ContractService,
        FileService
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
