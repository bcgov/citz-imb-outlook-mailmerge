/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// eslint-disable-next-line no-redeclare
/* global document, Office */
import { runMailMerge } from "./mailMerge";

let contactsFile: File;
let templateFile: File;
let attachmentFiles: FileList;
let subjectLine: string;

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg")!.style.display = "none";
    document.getElementById("app-body")!.classList.add("ms-welcome__main");
    document.getElementById("contactsFile")!.addEventListener("change", handleContacts, false);
    document.getElementById("templateFile")!.addEventListener("change", handleTemplate, false);
    document.getElementById("attachments")!.addEventListener("change", handleAttachments, false);
    document.getElementById("subjectLine")!.addEventListener("change", handleSubjectLine, false);
    document.getElementById("runMailMerge")!.onclick = handleMailMerge;
    console.log("Office is ready", document);
  }
});

function checkRequiredFiles() {
  const mailMergeButton = document.getElementById("runMailMerge");
  if (!contactsFile || !templateFile || !subjectLine) {
    mailMergeButton?.classList.add("is-disabled");
  } else {
    mailMergeButton?.classList.remove("is-disabled");
  }
}

async function handleSubjectLine(event: Event) {
  const target = event.target as HTMLInputElement;
  subjectLine = target.value;
  checkRequiredFiles();
}

async function handleContacts(event: Event) {
  const target = event.target as HTMLInputElement;
  contactsFile = target.files![0];
  checkRequiredFiles();
}

async function handleTemplate(event: Event) {
  const target = event.target as HTMLInputElement;
  templateFile = target.files![0];
  checkRequiredFiles();
}

async function handleAttachments(event: Event) {
  const filesToAttach = (event.target as HTMLInputElement).files;
  if (!filesToAttach || filesToAttach.length === 0) {
    return;
  }

  attachmentFiles = filesToAttach;

  const attachmentElement = document.getElementById("attachmentsList");

  Array.from(filesToAttach).map((file) => {
    attachmentElement!.innerHTML += `<li class="listItem ms-ListItem-tertiaryText">${file.name}</li>`;
  });
}

async function handleMailMerge() {
  runMailMerge({ subjectLine, contactsFile, templateFile, attachmentFiles });
}
