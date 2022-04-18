import { ConfigurationEntry } from "@cat/domain";
import {
	configurationsAdapter,
	ConfigurationsPartialState,
	initialState,
} from './configurations.reducer';
import * as ConfigurationsSelectors from './configurations.selectors';

describe('Configurations Selectors', () => {
	const ERROR_MSG = 'No Error Available';
	const getConfigurationsId = (it: ConfigurationEntry) => it.id;
	const createConfigurationEntriesEntity = (id: number, key) =>
		({
			id,
			key,
			value: 2,
		} as ConfigurationEntry);

	let state: ConfigurationsPartialState;

	beforeEach(() => {
		state = {
			configurations: configurationsAdapter.setAll(
				[
					createConfigurationEntriesEntity(1, 'KEY-AAA'),
					createConfigurationEntriesEntity(2, 'KEY.BBB'),
					createConfigurationEntriesEntity(3, 'KEY.CCC'),
				],
				{
					...initialState,
					selectedId: 1,
					error: ERROR_MSG,
					loaded: true,
				}
			),
		};
	});

	describe('Configurations Selectors', () => {
		it('getAllConfigurationEntries() should return the list of Configurations', () => {
			const results = ConfigurationsSelectors.getAllConfigurationEntries(state);
			const selId = getConfigurationsId(results[1]);

			expect(results.length).toBe(3);
			expect(selId).toBe(2);
		});

		it('getSelected() should return the selected Entity', () => {
			const result = ConfigurationsSelectors.getSelected(
				state
			) as ConfigurationEntry;
			const selId = getConfigurationsId(result);

			expect(selId).toBe(1);
		});

		it('getConfigurationEntriesLoaded() should return the current "loaded" status', () => {
			const result = ConfigurationsSelectors.getConfigurationsLoaded(state);

			expect(result).toBe(true);
		});

		it('getConfigurationsError() should return the current "error" state', () => {
			const result = ConfigurationsSelectors.getConfigurationsError(state);

			expect(result).toBe(ERROR_MSG);
		});
	});
});
