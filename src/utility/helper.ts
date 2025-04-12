import { SUPPORTED_FORMATS } from "./constant";

export const goToTop = (top = 0) => {
  window.scrollTo({
    top,
  });
};

export const blobToBase64 = (blob: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


export const convertedURLToFile = async (url: string): Promise<File | undefined> => {
  if (!url) return;

  const fileName = url.split("/").pop()?.split("?")[0] || "image";

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const mimeType = blob.type;
    const fileExtension = mimeType.split("/")[1];
    const fileNameWithExtension = `${fileName}.${fileExtension}`;
    
    if (!SUPPORTED_FORMATS.includes(mimeType)) {
      throw new Error(`Unsupported file type: ${mimeType}`);
    }

    const file = new File([blob], fileNameWithExtension, { type: mimeType });
    return file;
  } catch (error) {
    console.error("Error converting URL to file:", error);
    return undefined;
  }
};


export const convertedURLToBinary = async (url: string): Promise<ArrayBuffer | undefined> => {
  if (!url) return;

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return buffer; // This is raw binary data
  } catch (error) {
    console.error("Error converting URL to binary:", error);
    return undefined;
  }
};

export const options = (options: string[]) => {
  if (options && options?.length > 0) {
    const option = options?.map((item: string) => {
      return { label: item, value: item };
    });
    return option;
  }
};

export function isString(value: any): value is string {
  return typeof value === "string";
}