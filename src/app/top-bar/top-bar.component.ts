import {Component, Input, Output, EventEmitter} from "@angular/core";
import {HttpService} from ".././services/http.service";

interface IMenuNames {
    name: string;
    value: string;
}

@Component({
    selector: "top-bar",
    templateUrl: "./top-bar.component.html",
    styleUrls: ["./top-bar.component.less"]
})

export class TopbarComponent {
    @Output() changeCurrentPage: EventEmitter<any> = new EventEmitter();
    @Output() refreshData: EventEmitter<any> = new EventEmitter();
    private currentPage: string;
    public show: boolean = false;
    public buttons: IMenuNames[];

    constructor(private httpService: HttpService
    ) {
        this.buttons = [
            { name: "Home", value: "home" },
            { name: "Contracts", value: "contract" },
            { name: "Insurance", value: "insurance" },
            { name: "Receipts", value: "receipt" }
        ];
        this.currentPage = this.buttons[0].value;
    }
    public updatePage(button?: string) {
        this.currentPage = button;
        this.changeCurrentPage.emit(this.currentPage);
    }

    public refreshPage(): void {
        this.refreshData.emit();
    }
}
