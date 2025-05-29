import BikramSambat from "bikram-sambat-js";

export function convertAdToBs(date: Date | null): string {
    if (!date) return "";
    const bsInstance = new BikramSambat(date);
    return bsInstance.toBS();
}

export function convertBsToAd(bsDateStr: string | null): Date | null {
    if (!bsDateStr) return null;

    try {
        const adInstance = new BikramSambat(bsDateStr, "BS");
        const adDateStr = adInstance.toAD(); 

        return new Date(adDateStr);
    } catch (error: unknown) {
        console.error("Error converting BS date to AD:", error);
        return null;
    }
}

export function convertBsToAdString(bsDateStr: string | null): string | null {
    if (!bsDateStr) return null;

    try {
        const adInstance = new BikramSambat(bsDateStr, "BS");
        const adDateStr = adInstance.toAD(); 

        return adDateStr;
    } catch (error: unknown) {
        console.error("Error converting BS date to AD:", error);
        return null;
    }
}