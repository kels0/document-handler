import {Component, Input, Output, EventEmitter} from "@angular/core";

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

    constructor(
    ) {
        this.buttons = [
            { name: "Top places with sun", value: "top" },
            { name: "Sun league", value: "liga" },
            { name: "How was this made?", value: "how" },
        ];
    }
    public updatePage(value: string) {
        this.changeCurrentPage.emit(value);
    }

}
