"use strict";
// Angular modules
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

// Application modules
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContractPageComponent } from "./dashboard/contract-page/contract-page.component";
import { InsurancePageComponent } from "./dashboard/insurance-page/insurance-page.component";
import { ReceiptsPageComponent } from "./dashboard/receipts-page/receipts-page.component";
import { TopbarComponent } from "./top-bar/top-bar.component";
import { ListItemComponent } from "./list-item/list-item.component";
import { NewItemComponent } from "./dashboard/new-item-dialog/new-item.component";
import { EditComponent } from "./dashboard/edit-dialog/edit.component";
import { SearchPageComponent } from "./dashboard/search-page/search-page.component";
import { PreviewDocumentComponent } from "./list-item/preview-document/preview-document.component";
import { DeleteItemComponent } from "./list-item/delete-item/delete-item.component";

// Service modules
import { HelperService } from "./services/helper.service";
import { HttpService } from "./services/http.service";
import { ContractService } from "./services/contract.service";
import { DocumentService } from "./services/document.service";
import { InsuranceService } from "./services/insurance.service";
import { ReceiptsService } from "./services/receipts.service";
import { FileService } from "./services/file.service";
// other modules
import { routing } from "./app.routing";
import { OrderBy } from "./pipes/orderBy.pipe";
import { Constants } from "./constants";


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
        InsurancePageComponent,
        ListItemComponent,
        NewItemComponent,
        EditComponent,
        SearchPageComponent,
        PreviewDocumentComponent,
        DeleteItemComponent,
        ReceiptsPageComponent,
    ],
    providers: [
        HelperService,
        HttpService,
        ContractService,
        DocumentService,
        InsuranceService,
        ReceiptsService,
        FileService,
        Constants,
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
