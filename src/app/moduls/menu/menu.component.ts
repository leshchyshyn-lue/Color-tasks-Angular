import { Component, Input } from "@angular/core";
import { GREY_URL, RED_URL, TASKS_URL, YELLOW_URL } from "src/app/environment/url";

interface MenuItem {
    route: string,
    back: string
}


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

    @Input() public isAuthenticated!: boolean;

    public items: MenuItem[] = [
        { route: "/" + TASKS_URL, back: 'all' },
        { route: "/" + GREY_URL, back: 'grey-back' },
        { route: "/" + RED_URL, back: 'red-back' },
        { route: "/" + YELLOW_URL, back: 'yellow-back' }
    ]

}

