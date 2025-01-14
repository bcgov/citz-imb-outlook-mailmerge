import mammoth from "mammoth";

export async function extractTemplate(templateFile: File) {
  console.info("==> getTemplate", { templateFile });

  const reader = new FileReader();

  const text = await new Promise<string>((resolve, reject) => {
    reader.onload = async function (e) {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const result = await mammoth.extractRawText({ arrayBuffer });
      resolve(result.value);
    };
    reader.onerror = function (e) {
      console.error("Failed to read file", e);
      reject(new Error("Failed to read file"));
    };
    reader.readAsArrayBuffer(templateFile);
  });

  return text;
}
