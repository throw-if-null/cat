import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigurationDetails, ConfigurationEntry } from '@cat/config-data';
import { ProjectService } from '@cat/project-data';
import { FormControl } from '@ngneat/reactive-forms';
import { Subject, Observable, combineLatest } from 'rxjs';
import { switchMap, map, takeUntil, startWith, debounceTime } from 'rxjs/operators';

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
	styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent implements OnInit, OnDestroy {

	config$: Observable<ConfigurationDetails> | undefined;
	editEntry$ = new Subject<ConfigurationEntry>();

	searchControl = new FormControl<string>('');

	private unsubscribe$ = new Subject();

	constructor(private route: ActivatedRoute, private projectService: ProjectService) {

		this.editEntry$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((entry: ConfigurationEntry) => {
				console.log(entry);
				const projectId = +this.route.snapshot.params.projectId;
				const configId = +this.route.snapshot.params.configId;
				this.projectService.updateConfigurationEntry(projectId, configId, entry).then(console.log);
			});

		this.searchControl.value$
			.pipe(debounceTime(500))
			.subscribe(query => {
				console.log(query);
			});

	}

	ngOnInit() {

		// merge the original config fetch and edited entries together
		this.config$ = combineLatest([
			this.route.paramMap.pipe(
				switchMap((params: ParamMap) => {
					const projectId = params.get('projectId');
					const configId = params.get('configId');
					if (!projectId || !configId) {
						throw new Error('Missing config id parameter!');
					}

					return this.projectService.getConfigurationById(+projectId, +configId);
				})),
			this.editEntry$.pipe(startWith(null))
		]).pipe(
			map(([config, editEntry]) => {
				if (!editEntry) {
					return config;
				}
				console.log({ config });
				console.log({ editEntry });
				const originalEntryIndex = config.entries.findIndex(entry => entry.key === editEntry.key);
				if (originalEntryIndex !== -1) {
					config.entries[originalEntryIndex] = editEntry;
				}
				return config;
			})
		);
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	entryEdited(editedValue: any, entry: ConfigurationEntry, property: 'key' | 'value') {
		const parsedValue = parseValue(editedValue);
		const changed = entry[property] !== parsedValue;
		if (changed) {
			console.log(`Entry[${ entry.id }] edited ${ property } - new[${ parsedValue }] old[${ entry[property] }]`);

			entry[property] = parsedValue;

			this.editEntry$.next(entry);
		}
	}
}

function parseValue(value: any): any {
	if (isBoolean(value)) {
		return getBoolean(value);
	}

	if (isNumeric(value)) {
		return +value;
	}

	return value;
}


function isNumeric(value: any): boolean {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

function isBoolean(value: any): boolean {
	if (typeof value === 'boolean') {
		return true;
	}

	return value === 'true' || value === 'false';
}

function getBoolean(value: any) {
	switch (value) {
		case true:
		case 'true':
		case 1:
		case '1':
		case 'on':
		case 'yes':
			return true;
		default:
			return false;
	}
}
