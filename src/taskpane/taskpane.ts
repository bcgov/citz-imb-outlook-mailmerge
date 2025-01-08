/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// eslint-disable-next-line no-redeclare
/* global document, Office */
import runMailMerge from "./mailMerge";

let contactsFile: File;
let templateFile: File;
let attachmentFiles: FileList;

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg")!.style.display = "none";
    document.getElementById("app-body")!.classList.add("ms-welcome__main");
    document.getElementById("contactsFile")!.addEventListener("change", handleContacts, false);
    document.getElementById("templateFile")!.addEventListener("change", handleTemplate, false);
    document.getElementById("attachments")!.addEventListener("change", handleAttachments, false);
    document.getElementById("runMailMerge")!.onclick = handleMailMerge;
    console.log("This is the mail merge task pane for Outlook.");
  }
});

function checkRequiredFiles() {
  const mailMergeButton = document.getElementById("runMailMerge");
  if (!contactsFile || !templateFile) {
    mailMergeButton.classList.add("is-disabled");
  } else {
    mailMergeButton.classList.remove("is-disabled");
  }
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
  const attachmentFiles = (event.target as HTMLInputElement).files;
  if (!attachmentFiles || attachmentFiles.length === 0) {
    return;
  }

  const attachmentElement = document.getElementById("attachmentsList");

  Array.from(attachmentFiles).map((file) => {
    attachmentElement!.innerHTML += `<li class="listItem ms-ListItem-tertiaryText">${file.name}</li>`;
  });
}

async function handleMailMerge() {
  runMailMerge(contactsFile, templateFile, attachmentFiles);
}
