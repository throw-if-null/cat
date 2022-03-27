import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { RatCatService } from "./ratcat.service";

@NgModule({
	imports: [ CommonModule, HttpClientModule ],
	providers: [ RatCatService ]
})
export class RatCatModule {
}
