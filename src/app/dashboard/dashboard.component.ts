import {Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.less"],
})

export class DashboardComponent implements OnInit {
    public page: string;
    // public documents: IDocument[] = [];

    constructor(
        // private contractService: ContractService
    ) {}

    ngOnInit() {
        // this.getContracts();
    }

    /*private getContracts(): void {
        this.contractService.getAllContracts()
        .subscribe((contracts) => {
            this.documents = contracts.json()
        });
    }*/

    public changePage(page: string): void {
        if (page !== this.page) {
            this.page = page;
        }
    }

    public refreshData(): void {
        // this.getContracts();
    }
}
