# mitey👨‍💻
A CLI Tool for [mite](https://mite.yo.lk/). (⚠️ This is still a work in progress!)

## Requirements
You must have [`node`](https://nodejs.org/) (v6 or greater) and
[`npm`](https://www.npmjs.com/) installed to run mitey.

## Installation
Before you start, you need to generate an API key for your account.
Go to your mite settings (https://\<your-team>.mite.yo.lk/myself), select ☑️ **Allow API access**,
click `Display API key` and copy your key.

1. Run `npm install -g mitey` to install mitey globally.
2. Run `mitey init` and follow the instructions.
3. Run `mitey verify` to check if everything was set up correctly.

## Usage
- Use `mitey -h` to see all available commands.
- `mitey start` will walk you through a process to create a new time entry.
- `mitey stop` will try to stop the current tracker, if there is one.
- `mitey current ` will give you the current tracker, if there is one.

More commands will be implemented soon.

## License
MIT
