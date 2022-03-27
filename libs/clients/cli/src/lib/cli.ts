/**
 * chalk — colorizes the output
 * clear — clears the terminal screen
 * clui — draws command-line tables, gauges and spinners
 * figlet — creates ASCII art from text
 * inquirer — creates interactive command-line user interface
 * minimist — parses argument options
 * configstore — easily loads and saves config without you having to think about where and how.
 */

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
import { askRatCatCredentials } from "./inquirer";

clear();

// https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
console.log(
	chalk.magenta(
		figlet.textSync('RatCat', { horizontalLayout: 'full' })
	)
);


export const run = async () => {
	const credentials = await askRatCatCredentials();
	console.log(chalk.green('All preped!' + credentials));

};

