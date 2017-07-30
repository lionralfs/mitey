# mitey👨‍💻
[![version][version-badge]][package]
[![downloads][downloads-badge]][npm-stat]
[![MIT License][license-badge]][LICENSE]

A CLI Tool for [mite](https://mite.yo.lk/). (⚠️ This is still a work in progress!)

## Requirements
You must have [`node`](https://nodejs.org/) (v6 or higher) and
[`npm`](https://www.npmjs.com/) installed to run mitey.

Before you start, you need to generate an API key for your account.

- Go to your mite settings (*https://\<your-team>.mite.yo.lk/myself*)
- Select *Allow API access*,
- Click *Display API key* and copy your key.

## Installation
- Run `npm install -g mitey` to install mitey globally.
- Run `mitey init`.
	- Enter your team name. It is this part: **\<your-team>**.mite.yo.lk
	- Enter your API key
	- Enter a time in minutes that you want your time entries to be rounded up to. Leave it empty if you don't want to modify your time entries.
- Run `mitey verify` to check if everything was set up correctly.

## Usage

### Starting a new tracker
- `mitey start` will walk you through a process to create a new time entry. It will ask you to specify a *customer*, *project* and *service*. You can also provide a *note*.

### Stopping the tracker
- `mitey stop` will try to stop the current tracker, if there is one.

### Viewing the current tracker
- `mitey current` will give you the current tracker, if there is one.

### Customers
- `mitey customers` lists all active customers.
- Use `mitey customers -n ExampleCustomer` to filter by name.

### Projects
- `mitey projects` lists all active projects.
- Use `mitey projects -n ExampleProject` to filter by name.

### Services
- `mitey services` lists all active services.
- Use `mitey services -n ExampleService` to filter by name.


## Bugs
Feel free to report bugs [here](https://github.com/lionralfs/mitey/issues).

## License
MIT

[version-badge]: https://img.shields.io/npm/v/mitey.svg?style=flat-square
[package]: https://www.npmjs.com/package/mitey
[downloads-badge]: https://img.shields.io/npm/dm/mitey.svg?style=flat-square
[npm-stat]: https://npm-stat.com/charts.html?package=mitey&from=2016-07-24
[license-badge]: https://img.shields.io/npm/l/mitey.svg?style=flat-square
[license]: https://github.com/lionralfs/mitey/blob/master/LICENSE
