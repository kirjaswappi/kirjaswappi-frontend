import CryptoJS from "crypto-js";

export const setCookie = (name: string, value: any, time: number) => {
    const encryptedValue = CryptoJS.AES.encrypt(
        value,
        import.meta.env.VITE_REACT_SECRET_KEY
    ).toString();

    const date = new Date();
    date.setTime(date.getTime() + time * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${encryptedValue}; ${expires}; path=/; Secure`;
};

export const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(";");

    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            const encryptedValue = cookie.substring(
                nameEQ.length,
                cookie.length
            );
            const decryptedValue = CryptoJS.AES.decrypt(
                encryptedValue,
                import.meta.env.VITE_REACT_SECRET_KEY
            ).toString(CryptoJS.enc.Utf8);

            return decryptedValue;
        }
    }
    return null;
};

export const clearCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict;`;
};

const isCookieExpired = (name: string) => {
    const cookie = getCookie(name);

    if (!cookie) {
        console.log("Cookie has expired or is not set.");
        return true; // Cookie is expired or doesn't exist
    }
    return false; // Cookie is still valid
};

// Function to handle cookie expiration (remove expired cookies)
export const handleExpiredCookie = (name: string) => {
    if (isCookieExpired(name)) {
        clearCookie(name);
        console.log(`Cookie ${name} has expired. It has been removed.`);
    } else {
        console.log(`Cookie ${name} is still valid.`);
    }
};
