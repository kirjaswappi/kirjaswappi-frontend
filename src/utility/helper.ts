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