import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';

import { RatCatService } from './ratcat.service';

describe('RatcatService', () => {
	let service: RatCatService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ RatCatService ]

		});
		service = TestBed.inject(RatCatService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
