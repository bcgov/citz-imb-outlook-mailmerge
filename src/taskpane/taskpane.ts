/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// eslint-disable-next-line no-redeclare
/* global document, Office */

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg")!.style.display = "none";
    document.getElementById("app-body")!.classList.add("ms-welcome__main");
    document.getElementById("attachments")?.addEventListener("change", handleAttachments, false);
  }
});

async function handleAttachments(event: Event) {
  const attachments = (event.target as HTMLInputElement).files;
  if (!attachments || attachments.length === 0) {
    return;
  }

  const attachmentElement = document.getElementById("attachmentsList");

  Array.from(attachments).map((file) => {
    attachmentElement!.innerHTML += `<li class="listItem ms-ListItem-tertiaryText">${file.name}</li>`;
  });
}
