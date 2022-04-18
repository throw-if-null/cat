import { Component, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ConfigurationFacade } from "@cat/config";
import { ConfigurationEntry } from '@cat/domain';
import { parseStringValue } from '@cat/utils';
import { FormControl } from '@ngneat/reactive-forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

// interface EditableConfigurationEntry extends ConfigurationEntry {
// 	editing?: boolean;
// }
//
// interface EditableConfigurationDetails extends ConfigurationDetails {
// 	entries: EditableConfigurationEntry[];
// }

@Component({
	selector: 'cat-config-details',
	templateUrl: './config-details.component.html',
	styleUrls: [ './config-details.component.scss' ]
})
export class ConfigDetailsComponent implements OnDestroy {

	entries$: Observable<ConfigurationEntry[]>;
	editEntry$ = new Subject<ConfigurationEntry>();

	searchControl = new FormControl<string>('');

	private unsubscribe$ = new Subject();

	constructor(private activatedRouteSnapshot: ActivatedRouteSnapshot, private configurationFacade: ConfigurationFacade) {
		this.entries$ = this.configurationFacade.allConfigurationEntries$;

		this.editEntry$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((entry) => {
				console.log(entry);
				const { projectId, configId } = this.activatedRouteSnapshot.params;

				if (!projectId || !configId) {
					throw new Error('Can not update config before init');
				}
				this.configurationFacade.updateConfigurationEntry(entry, projectId, configId);

			});

		this.searchControl.value$
			.pipe(debounceTime(500))
			.subscribe(query => {
				console.log(query);
			});

	}


	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	entryEdited(editedValue: any, entry: ConfigurationEntry, property: 'key' | 'value') {
		const parsedValue = parseStringValue(editedValue);
		const changed = entry[property] !== parsedValue;
		if (changed) {
			console.log(`Entry[${ entry.id }] edited ${ property } - new[${ parsedValue }] old[${ entry[property] }]`);

			const clone = { ...entry };
			clone[property] = parsedValue;

			this.editEntry$.next(clone);
		}
	}
}
