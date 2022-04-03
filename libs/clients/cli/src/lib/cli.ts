/**
 * chalk — colorizes the output
 * clear — clears the terminal screen
 * clui — draws command-line tables, gauges and spinners
 * figlet — creates ASCII art from text
 * inquirer — creates interactive command-line user interface
 * minimist — parses argument options
 * configstore — easily loads and saves config without you having to think about where and how.
 */

import { parseConfigEntries } from "@ratcat/utils";
import chalk from 'chalk';
import clui from "clui";
import Configstore from "configstore";
import figlet from "figlet";
import path from "path";

import { readJSONFile } from "./files.js";
import { askRatCatCredentials } from "./inquirer.js";
import { getConfiguration } from "./transport.js";

const Spinner = clui.Spinner;

// process.stdout.write('\x1b[0f'); // clear

// https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
console.log(
	chalk.magenta(
		figlet.textSync('RatCat', { horizontalLayout: 'full' })
	)
);

const rootPath = process.cwd();


export const run = async () => {
	const pkg = await readJSONFile(path.resolve(rootPath, 'package.json'));
	const conf = new Configstore(pkg.name);
	console.log(pkg);

	let credentials = conf.get('dsn');
	if (!credentials) {
		credentials = await askRatCatCredentials();
		conf.set('dsn', credentials.dsn)
	}

	console.log(chalk.green('All preped!'));
	console.log(credentials);

	const status = new Spinner('Fetching configuration, this might take some seconds...');
	status.start();

	const testConfig = await getConfiguration('1337');
	const parsedConfig = parseConfigEntries(testConfig.entries);
	status.stop();
	console.log(parsedConfig);

};

