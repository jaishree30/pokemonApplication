import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [],
    imports: [
        BrowserAnimationsModule,
        MatPaginatorModule,
        HttpClientModule,
        MatGridListModule,
        MatCardModule,
        MatTabsModule,

    ],
    providers: [],
    exports: [BrowserAnimationsModule,
        MatPaginatorModule,
        HttpClientModule,
        MatGridListModule,
        MatCardModule,
        MatTabsModule,]
})
export class CommonModule { }