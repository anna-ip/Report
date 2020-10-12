# A Tracking report

A Command line tool for tracking visitors built with Node.js

A log is given when a .txt file is read, then depending on the date-range filter in the CLI tool a report is recived and diplayed in the log as well as a new .txt file.

#Setup/Build

1. npm install: to install the dependencies
2. npm install --save yargs
3. npm install --save-dev jest
4. Start the CLI tool: node index log.txt

Use the CLI:
To filter the log by add daterange -s Start date -e End date:
node log.txt index -s '<daterange>' -e '<daterange>'

Process:
I started to read up on Command line tools.
Then made a plan for how to get to the result.
Went step by step to get the filtered result.

Next step:
Would be to refactor the code and make it in to smaller components for easier testing.
Unit-tests for the different components.

Most proud of:
This was my very first CLI tool so it was a superfun task to do, I learned alot during the process and would like to keep investigating more into CLI and unit-tests.
Plus I'm curious about how to do this in Phyton since most googling gave me a Phyton result as well.
