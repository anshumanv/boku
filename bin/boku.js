#!/usr/bin/env node

'use strict';

const path = require('path');
const inquirer = require('inquirer');
const program = require('commander');
const { scaffold } = require('egad');
const kebabCase = require('lodash.kebabcase');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const stringifyAuthor = require('stringify-author');
const {guessEmail, guessAuthor, guessGitHubUsername} = require('conjecture');

const TEMPLATE_REPO_URL = 'https://github.com/anshumanv/my-cli-template.git';

program
	.usage('[options] [destination]')
	.option('-n, --name <app-name>', 'Your name')
	.option('-d, --description "<description>"',
		'Description (contain in quotes)')
	.option('-g, --github "<github>"',
		'Your github username')
	.option('-e, --email <email>', 'Your email address')
	.option('-t, --twitter <twitter>', 'Your twitter handle')
	.option('-w, --web <website>', 'Your website URL')
	.option('-b, --blog <blog>', 'Link to your blog')
	.option('--overwrite', 'Overwrite existing files', false)
	.option('--template <template-url>', 'URL of custom template',
		TEMPLATE_REPO_URL)
	.parse(process.argv);

const destination = program.args.length === 0 ?
	process.cwd() :
	path.resolve(process.cwd(), program.args.shift());

const prompts = [
  {
    type: 'input',
    name: 'name',
    default() {
      return guessAuthor();
    },
    message: 'Your full name:',
    when: !program.author
  },
	{
		type: 'input',
		name: 'description',
		default() {
			return 'My own cli!';
		},
		message: 'Please describe yourself'
	},
	{
		type: 'input',
		name: 'email',
		default() {
			return guessEmail();
		},
		message: 'Your email address:',
		when: !program.email
	},
	{
		type: 'input',
		name: 'github',
		default(answers) {
			return guessGitHubUsername(answers.email);
		},
		message: 'GitHub user or org name:',
		when: !program.github
  },
  {
		type: 'input',
		name: 'twitter',
		default(answers) {
			return answers.twitter
		},
		message: 'Your twitter handle:',
		when: !program.twitter
  },
  {
		type: 'input',
		name: 'web',
		default(answers) {
			return answers.web
		},
		message: 'Your website or portfolio link:',
		when: !program.web
  },
  {
		type: 'input',
		name: 'blog',
		default(answers) {
			return answers.web
		},
		message: 'Link to your blog',
		when: !program.blog
  },
  {
		type: 'input',
		name: 'linkedin',
		default(answers) {
			return answers.linkedin
		},
		message: 'Link to your linkedIn profile',
		when: !program.linkedin
	},
	{
		type: 'input',
		name: 'repo',
		default(answers) {
			return answers.github || kebabCase(path.basename(destination));
		},
		message: 'Repository name:',
		when: !program.repo
	}
];

console.log(chalk.blue('Let\'s generate a quick publish-ready cli for you!'));

inquirer.prompt(prompts)
	.then(answers => {
    answers.author = stringifyAuthor({
      name: answers.name,
			email: answers.email,
			url: answers.web
    });
    console.log(answers);
		answers.year = new Date().getFullYear();
		return scaffold(program.template, destination, answers, {
			overwrite: Boolean(program.overwrite)
		});
	})
	.then(results => {
		results.forEach(fileinfo => {
			console.log(`${fileinfo.skipped ? chalk.yellow('skipped existing file') :
				chalk.green('created file')}: ${fileinfo.path}`);
		});
		return console.log(chalk.blue('Finished scaffolding files!'));
	})
	.then(() => {
		console.log(chalk.blue('\nInstalling Node dependencies!'));
		const child = spawn('npm', ['install', '--prefix', destination], {stdio: 'inherit'});
		child.on('close', code => {
			if (code !== 0) {
				console.log(chalk.red(`Could not install npm dependencies. Try running ${chalk.bold('npm install')} yourself.`));
				return;
			}
			console.log(chalk.blue('\nDone! Push this code on github and publish this on npm.'));
		});
	});