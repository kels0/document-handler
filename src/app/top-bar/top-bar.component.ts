import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Constants } from ".././constants";

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
    private currentPage: string;
    public show = false;
    public buttons: IMenuNames[];

    constructor(
        private constants: Constants
    ) {
        this.buttons = [
            { name: "Search", value: "home" },
            { name: "Contracts", value: this.constants.CONTRACTS },
            { name: "Insurance", value: this.constants.INSURANCES },
            { name: "Receipts", value: this.constants.RECEIPTS }
        ];
        this.currentPage = this.buttons[0].value;
    }
    public updatePage(button?: string) {
        this.currentPage = button;
        this.changeCurrentPage.emit(this.currentPage);
    }
}
