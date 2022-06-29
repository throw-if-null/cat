import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationFacade } from "@cat/config";
import { ConfigImportComponent } from "@cat/config-import";
import { ConfigurationEntry, ConfigurationEntryCreateData, ConfigurationEntryData } from '@cat/domain';
import { ProjectsFacade } from "@cat/project";
import { parseStringValue } from '@cat/utils';
import { DialogService } from "@ngneat/dialog";
import { FormControl } from '@ngneat/reactive-forms';
import { flattenConfigEntries } from "@ratcat/core";
import { Logger } from "@ratcat/logger";
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, withLatestFrom } from 'rxjs/operators';

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
})
export class ConfigDetailsComponent implements OnDestroy {

	projectName?: string;
	configId?: number;


	entries$: Observable<ConfigurationEntry[]>;
	editEntry$ = new Subject<ConfigurationEntry>();

	searchControl = new FormControl<string>('');

	entryForm = new FormGroup({
		key: new FormControl('', Validators.required),
		value: new FormControl("", Validators.required)
	});

	private logger = new Logger('ConfigDetailsComponent');
	private unsubscribe$ = new Subject();

	constructor(private router: Router, private route: ActivatedRoute, private dialog: DialogService, private projectFacade: ProjectsFacade, private configurationFacade: ConfigurationFacade) {
		this.entries$ = this.configurationFacade.allConfigurationEntries$;
		this.configurationFacade.configuration$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(configuration => {
				this.configId = configuration.configurationId;

				// re-fetch project details. If not loaded yet
				if (configuration.projectId) {
					this.projectFacade.loadProject(configuration.projectId);
				}
			});

		this.projectFacade.projectDetails$
			.pipe(
				takeUntil(this.unsubscribe$))
			.subscribe(project => {

				this.projectName = project?.name;
			});

		this.editEntry$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((entry) => {
				console.log(entry);

				this.configurationFacade.updateConfigurationEntry(entry, this.configId!);
			});

		// this.searchControl.value$
		// 	.pipe(debounceTime(500))
		// 	.subscribe(query => {
		// 		console.log(query);
		// 	});

		this.configurationFacade.entryCreateSuccess$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(() => {
				this.entryForm.reset();
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

	openImportConfigDialog() {
		const dialogRef = this.dialog.open<any, any>(ConfigImportComponent, {
			size: 'lg'
		});

		dialogRef.afterClosed$
			.pipe(
				take(1),
				withLatestFrom(this.projectFacade.projectDetails$)
			)
			.subscribe(([ data, projectDetails ]) => {

				// if aborts the dialog, we have no data
				if (!data) {
					return;
				}
				if (!projectDetails) {
					this.logger.warn('User trying to create a configuration without a project loaded');
					return;
				}
				console.log();

				const entries = prepareConfigurationEntry(flattenConfigEntries(data));

				this.configurationFacade.createConfigurationEntries(entries, this.configId!);
			});

	}

}

function prepareConfigurationEntry(configEntries: ConfigurationEntryData[]): ConfigurationEntryCreateData[] {
	return configEntries.map(entry => ({ ...entry, disabled: false, secondsToLive: 0 }));
}
