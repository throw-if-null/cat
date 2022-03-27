const inquirer = require("inquirer");

export function askRatCatCredentials() {
	const questions = [
		{
			name: 'username',
			type: 'input',
			message: 'Enter your RatCat CDN:',
			validate: function (value: string) {
				if (value.length) {
					return true;
				} else {
					return 'Please enter a valid CDN';
				}
			}
		}
	];
	return inquirer.prompt(questions);
}
