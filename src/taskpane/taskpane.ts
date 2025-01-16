/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// eslint-disable-next-line no-redeclare
/* global document, Office */
import { runMailMerge } from "./mailMerge";

let contactsFile: File | undefined;
let templateFile: File | undefined;
let attachmentFiles: FileList | undefined;
let subjectLine: string | undefined;
let userEmail: string | undefined;

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg")!.style.display = "none";
    document.getElementById("app-body")!.classList.add("ms-welcome__main");
    document.getElementById("contactsFile")!.addEventListener("change", handleContacts, false);
    document.getElementById("templateFile")!.addEventListener("change", handleTemplate, false);
    document.getElementById("attachments")!.addEventListener("change", handleAttachments, false);
    document.getElementById("subjectLine")!.addEventListener("change", handleSubjectLine, false);
    document.getElementById("userEmail")!.addEventListener("change", handleUserEmail, false);
    document.getElementById("runMailMerge")!.onclick = handleMailMerge;

    console.log("Office is ready", document);
  }
});

function clearSuccessNotification() {
  document.getElementById("successNotification")!.innerText = "";
}

function checkRequiredFiles() {
  clearSuccessNotification();
  const mailMergeButton = document.getElementById("runMailMerge");
  if (!contactsFile || !templateFile || !subjectLine || !userEmail) {
    mailMergeButton?.classList.add("is-disabled");
  } else {
    mailMergeButton?.classList.remove("is-disabled");
  }
}

async function handleUserEmail(event: Event) {
  const target = event.target as HTMLInputElement;
  userEmail = target.value;
  checkRequiredFiles();
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

function clearForm() {
  const fileInputs = document.querySelectorAll("input[type='file']");
  fileInputs.forEach((input) => {
    const fileInput = input as HTMLInputElement;
    fileInput.value = "";
  });

  const textInputs = document.querySelectorAll("input[type='text']");
  textInputs.forEach((input) => {
    const textInput = input as HTMLInputElement;
    textInput.value = "";
  });

  const emailInputs = document.querySelectorAll("input[type='email']");
  emailInputs.forEach((input) => {
    const emailInput = input as HTMLInputElement;
    emailInput.value = "";
  });

  const attachmentElement = document.getElementById("attachmentsList");
  attachmentElement!.innerHTML = "";

  contactsFile = undefined;
  templateFile = undefined;
  attachmentFiles = undefined;
  subjectLine = undefined;
  userEmail = undefined;

  checkRequiredFiles();
}

async function handleMailMerge() {
  document.getElementById("runMailMerge")!.classList.add("is-disabled");
  if (!contactsFile || !templateFile || !subjectLine || !userEmail) {
    console.error("Missing required fields", { contactsFile, templateFile, subjectLine, userEmail });
    return;
  }
  const response = await runMailMerge({ subjectLine, contactsFile, templateFile, attachmentFiles, userEmail });
  console.log("Mail merge complete", response);
  clearForm();
  document.getElementById("successNotification")!.innerText = "Mail merge complete!";
}
