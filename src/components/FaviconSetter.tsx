import { useEffect } from "react";

const FALLBACK_FAVICON = "/texas-hodl-logo.png";

function applyFavicon(url: string) {
    const links = document.querySelectorAll("link[rel*=\"icon\"]");
    links.forEach((link) => {
        (link as HTMLLinkElement).href = url;
    });

    const appleTouchIcon = document.querySelector("link[rel=\"apple-touch-icon\"]") as HTMLLinkElement;
    if (appleTouchIcon) appleTouchIcon.href = url;

    const maskIcon = document.querySelector("link[rel=\"mask-icon\"]") as HTMLLinkElement;
    if (maskIcon) maskIcon.href = url;
}

/**
 * Sets the document title and favicon from build-time branding.
 * The repository-owned Texas HODL asset is applied first and remains in place
 * whenever a configured remote or deployment-specific image cannot be loaded.
 */
const FaviconSetter: React.FC = () => {
    useEffect(() => {
        const appTitle = import.meta.env.VITE_APP_TITLE || "Texas HODL";
        document.title = appTitle;

        const configuredFavicon = import.meta.env.VITE_FAVICON_URL;
        applyFavicon(FALLBACK_FAVICON);

        if (!configuredFavicon || configuredFavicon === FALLBACK_FAVICON) return;

        let active = true;
        const image = new Image();
        image.onload = () => {
            if (active) applyFavicon(configuredFavicon);
        };
        image.src = configuredFavicon;

        return () => {
            active = false;
        };
    }, []);

    return null;
};

export default FaviconSetter;
