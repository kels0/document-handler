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
    public buttons: IMenuNames[];

    constructor(private httpService: HttpService
    ) {
        this.buttons = [
            { name: "Contracts", value: "contract" },
            { name: "Insurance", value: "insurance" },
            { name: "Receipts", value: "receipt" }
        ];
    }
    public updatePage(value: string) {
        this.changeCurrentPage.emit(value);
    }
}
