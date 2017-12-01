import { Component } from "@angular/core";
import { DocumentService, IDocument } from ".././services/document.service";
import { Constants } from ".././constants";
import { HelperService } from ".././services/helper.service";


@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.less"],
})

export class DashboardComponent {
    public documents: IDocument[] = [];
    public page: string;

    constructor(
        private documentService: DocumentService,
        private helperService: HelperService,
        private constants: Constants
    ) {
        this.helperService.currentType.subscribe(
            (document) => {
                if (document && this.documents) {
                this.updateDocuments(document.type);
                }
            }
        );
    }

    public changePage(page: string): void {
        if (page !== this.page) {
            this.page = page;
            this.updateDocuments(page);
        }
    }

    private updateDocuments(type: string): void {
        switch (type) {
            case this.constants.CONTRACTS:
                this.documentService.getContracts().subscribe((response) => {
                    this.documents = response.json();
                });
                break;
            case this.constants.INSURANCES:
                this.documentService.getInsurances().subscribe((response) => {
                    this.documents = response.json();
                });
                break;
            case this.constants.RECEIPTS:
                this.documentService.getReceipts().subscribe((response) => {
                    this.documents = response.json();
                });
                break;
            default:
                // get Others
        }
    }
}
