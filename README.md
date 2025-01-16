This is a down and dirty way to side-load an add-in to outlook to run a mail merge.  This is not a production ready solution, but quick work-around until a production solution is available.

## Prerequisites
- you must install node.js version 20.6 or later on your computer.  You can download it from [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

## Setup
1. In the GitHub repository, click on the 'Code' button and download the zip file.
2. Unzip the file to a folder on your computer.
3. open a command prompt and navigate to the folder where you unzipped the files.
4. run the following command to install the required packages:
```bash
npm install
```

## Running the add-in
1. open a command prompt
2. navigate to the folder where you unzipped the files
3. run the following command:
```bash
npm run start:mailmerge
```
You may be prompted to install a certificate.  Click 'Yes' to install the certificate.  This will allow the add-in to run in outlook.  In future sessions you may be prompted to delete the expired certificate.  You can safely delete the certificate.  It will then prompt to install the certificate again.

A second cmd window will open and a new instance of outlook will open.  You can ignore the second cmd window, but don't close it.  It will take a few minutes for outlook to load.  Probably long enough to get a coffee, but not to make a pot of coffee.

4. Once it is loaded, click on an email (any email) and the 'Mail Merge' group will become enabled.
5. Click on the 'Show Mail Merge Pane' button to start the mail merge process.
6. You will be prompted to debug the webview.  Click 'OK' to continue. A new pane will open.
7. Select your contacts file.  It must be a .xlsx file.  The first row must contain the column headers. There must be a column named 'To' that contains the email addresses.
8. Select your email template.  It must be a .docx file.
9. Select any additional pdf attachments.
10. Enter the subject line of the email.
11. Enter the from email address.  This is the email address that will be used as the reply email.  It will also be appended to the 'Bcc' field.
12. Click 'Start Mail Merge' to start the mail merge process.

## Stopping the add-in
1. On the first command window, press `Ctrl+C` to stop the proxy server.
2. run the following command to stop the add-in:
```bash
npm run stop
```
The second cmd window will close.

3. exit the outlook instance that was opened.
4. You can now close the first cmd window.

## Notes
### Contacts File
- must be a .xlsx file
- the first row must contain the column headers
- there must be a column named 'To' that contains the email addresses. Capitalization does matter.
- you may include optional columns 'Cc' and 'Bcc'.  Capitalization does matter.
- all columns will be available as merge fields in the email template
### Email Template
- must be a .docx file
- any text in the document will be used as the email body
- any merge fields in the document will be replaced with the corresponding value from the contacts file
- merge fields must be in the format `{{column header}}` and must match the column header in the contacts file exactly.  Capitalization does matter.
### Additional Attachments
- any additional attachments will be attached to the email
- attachments must be pdf files
- total size of attachments must be less than 50MB


