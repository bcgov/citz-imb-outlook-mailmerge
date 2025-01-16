import { SendMailOptions } from "../helpers";

export async function sendEmail(mailOptions: SendMailOptions) {
  console.log("--> sendEmail", mailOptions);

  if (mailOptions.emailRecipients.Bcc) {
    mailOptions.emailRecipients.Bcc.push("scott.toews@gov.bc.ca");
  } else {
    mailOptions.emailRecipients.Bcc = ["scott.toews@gov.bc.ca"];
  }

  const response = await fetch("http://localhost:3001/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: mailOptions.emailRecipients.To,
      cc: mailOptions.emailRecipients.Cc,
      bcc: mailOptions.emailRecipients.Bcc,
      subject: mailOptions.subjectLine,
      body: mailOptions.body,
      from: "scott.toews@gov.bc.ca",
      bodyType: "text",
      attachments: mailOptions.attachments,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.statusText}`);
  } else {
    console.log("Email sent successfully");
    console.log(await response.json());
  }
}
