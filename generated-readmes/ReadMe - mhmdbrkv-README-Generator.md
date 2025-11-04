# README-Generator

## Description

This repository hosts a command-line interface (CLI) tool built with Node.js designed to automate the creation of high-quality README.md files for your GitHub projects. It prompts users for relevant project information and generates a well-structured, informative README file.

## Stack Used

*   Node.js
*   Inquirer.js (for user prompts)
*   fs (Node.js file system module)

## Features

*   Interactive CLI prompts for project details (title, description, installation instructions, usage, contribution guidelines, license, etc.).
*   Generates a Markdown-formatted README.md file.
*   Includes sections for project description, installation, usage, contributing, and license.
*   Dynamically inserts user-provided information into the README template.
*   Supports common open-source licenses (MIT, Apache 2.0, GPLv3, BSD 3-Clause).
*   Option to add a GitHub username and email address to the README for contact and contribution purposes.
*   Handles errors gracefully and provides informative messages to the user.

## Installation

1.  Clone the repository: `git clone https://github.com/mhmdbrkv/README-Generator.git`
2.  Navigate to the project directory: `cd README-Generator`
3.  Install dependencies: `npm install`

## Usage

1.  Run the application: `node index.js`
2.  Answer the prompts in the command line interface.
3.  A `README.md` file will be generated in the same directory.

## License

This project is licensed under the [MIT License](LICENSE).