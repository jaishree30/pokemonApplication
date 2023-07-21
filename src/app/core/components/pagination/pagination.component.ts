import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
    @Input() totalItems: any;
    @Input() itemsPerPage = 10;
    @Input() currentPage = 1;
    @Output() pageChange = new EventEmitter<number>();

    get totalPages(): any {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    onPageClick(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.pageChange.emit(page);
        }
    }
}