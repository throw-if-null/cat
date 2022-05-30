import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
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
	styleUrls: [ './config-details.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigDetailsComponent implements OnDestroy {

	configName?: string;
	configId?: number;


	entries$: Observable<ConfigurationEntry[]>;
	editEntry$ = new Subject<ConfigurationEntry>();

	searchControl = new FormControl<string>('');

	entryForm = new FormGroup({
		key: new FormControl('', Validators.required),
		value: new FormControl("", Validators.required)
	});

	private unsubscribe$ = new Subject();

	constructor(private router: Router, private route: ActivatedRoute, private configurationFacade: ConfigurationFacade) {
		this.entries$ = this.configurationFacade.allConfigurationEntries$;
		this.configurationFacade.configuration$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(configuration => {
				this.configName = configuration.configurationName;
				this.configId = configuration.configurationId;
			});

		this.editEntry$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((entry) => {
				console.log(entry);

				this.configurationFacade.updateConfigurationEntry(entry, this.configId!);
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

	deleteEntry(entryId: number) {
		this.configurationFacade.deleteConfigurationEntry(entryId, this.configId!);
	}

	addConfigurationEntry() {
		const { key, value } = this.entryForm.value;

		const parsedValue = parseStringValue(value);

		this.configurationFacade.createConfigurationEntry({
			key,
			value: parsedValue,
			disabled: false,
			secondsToLive: 0
		}, this.configId!);
	}

	toggleEntryDisabled(entry: ConfigurationEntry) {
		const clone = { ...entry };
		clone.disabled = !entry.disabled;

		this.editEntry$.next(clone);
	}

	goBack() {
		const { projectId } = this.route.snapshot.params;

		this.router.navigate([ '/projects', projectId ]);
	}
}
