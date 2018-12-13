import { Component, ViewChild } from "@angular/core";
import { DocumentService, IDocument } from ".././services/document.service";
import { Constants } from ".././constants";
import { HelperService } from ".././services/helper.service";
import { SearchPageComponent } from "./search-page/search-page.component";


@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.less"],
})

export class DashboardComponent {
    public documents: IDocument[] = [];
    public page: string;
     @ViewChild(SearchPageComponent) searchChild: SearchPageComponent;

    constructor(
        private documentService: DocumentService,
        private helperService: HelperService,
        private constants: Constants
    ) {
        this.page = this.constants.HOME;
        this.helperService.updatedDocument.subscribe((selectedDocument) => {
            if (selectedDocument) {
                if (this.page === this.constants.HOME) {
                    this.updateDocumentList(selectedDocument, this.searchChild.documents)
                } else {
                    this.updateDocumentList(selectedDocument, this.documents);
                }
            }
        });

        this.helperService.deletedDocument.subscribe((selectedDocument) => {
            if (selectedDocument && this.page !== this.constants.HOME) {
                this.deleteDocument(selectedDocument, this.documents);
            } else if (selectedDocument && this.page === this.constants.HOME) {
                this.deleteDocument(selectedDocument, this.searchChild.documents);
            }
        });
    }

    public changePage(page: string): void {
        if (page !== this.page) {
            this.page = page;
            this.updateDocuments(page);
        }
    }

    private updateDocumentList(selectedDocument: IDocument, documents: IDocument[]): void {
        if (Array.isArray(documents)) {
            const index = documents.findIndex(( documentItem ) => {
                return documentItem.id === selectedDocument.id;
            });
            if (index !== -1) {
                documents[index] = selectedDocument;
            } else {
                documents.unshift(selectedDocument);
            }
        }
    }

    private deleteDocument(selectedDocument: IDocument, documents: IDocument[]): void {
        if (Array.isArray(documents)) {
            const deletedIndex = documents.findIndex(( documentItem ) => {
                return documentItem.id === selectedDocument.id;
            });
            documents.splice(deletedIndex, 1)
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
