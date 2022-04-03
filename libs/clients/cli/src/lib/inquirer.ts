import inquirer from "inquirer";

export function askRatCatCredentials() {
	const questions = [
		{
			name: 'dsn',
			type: 'input',
			message: 'Enter your RatCat DSN:',
			validate: function (value: string) {
				if (value.length) {
					return true;
				} else {
					return 'Please enter a valid DSN';
				}
			}
		}
	];
	return inquirer.prompt(questions);
}
