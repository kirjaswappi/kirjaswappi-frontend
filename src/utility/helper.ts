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


export const options = (options: string[]) => {
  if (options && options?.length > 0) {
    const option = options?.map((item: string) => {
      return { label: item, value: item };
    });
    return option;
  }
};