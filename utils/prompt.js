const readMePrompt = (githubUrl) => {
  return `
    Generate a ReadMe for the GitHub repository at ${githubUrl} in markdown format.
    Use the actual code of the repository and commits from the repository as references for the ReadMe content (if available).

    including a summary of the repository, its purpose, and any additional relevant information,
    The ReadMe should be written in markdown format, no additional explanations are required,
    and should be as concise and clear as possible while still providing a detailed overview of the repository,

    You can use the following template as a starting point:
    # Repository Name
    ## Description
    ## Stack Used
    ## Features
    ## Installation
    ## Usage
    ## License
    `;
};

module.exports = { readMePrompt };
