import {Component, OnInit, Input } from "@angular/core";
import { ContractService, IContract } from ".././services/contract.service";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.less"],
})

export class DashboardComponent implements OnInit {
    public page: string;
    public documents: IContract[] = [];
    @Input() selectedDocument: IContract;

    constructor(private contractService: ContractService) {}

    ngOnInit() {
        this.getContracts();
    }

    private getContracts(): void {
        this.contractService.getAllContracts()
        .subscribe((contracts) => {
            this.documents = contracts.json()
        });
    }

    public changePage(page: string): void {
        if (page !== this.page) {
            this.page = page;
        }
    }

    public refreshData(): void {
        this.getContracts();
    }
}
