export async function extractAttachment(attachmentFile: File): Promise<string> {
  console.info("==> extractAttachment", { attachmentFile });

  const reader = new FileReader();

  const base64String = await new Promise<string>((resolve, reject) => {
    reader.onload = function (e) {
      const base64 = (e.target?.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = function (e) {
      console.error("Failed to read file", e);
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(attachmentFile);
  });

  return base64String;
}
