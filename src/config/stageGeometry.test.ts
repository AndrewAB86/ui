import { getViewportMode } from "./stageGeometry";

describe("getViewportMode", () => {
    const originalMatchMedia = window.matchMedia;

    const setViewport = (width: number, height: number, coarsePointer: boolean) => {
        Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: width });
        Object.defineProperty(window, "innerHeight", { configurable: true, writable: true, value: height });
        window.matchMedia = jest.fn().mockImplementation((query: string) => ({
            matches: query === "(pointer: coarse)" ? coarsePointer : false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }));
    };

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    it("returns mobile-landscape for standard mobile landscape widths", () => {
        setViewport(900, 430, true);
        expect(getViewportMode()).toBe("mobile-landscape");
    });

    it("returns mobile-landscape for compact touch landscape fold-like viewports", () => {
        setViewport(1400, 800, true);
        expect(getViewportMode()).toBe("mobile-landscape");
    });

    it("keeps desktop for compact landscape viewports on non-touch pointers", () => {
        setViewport(1400, 800, false);
        expect(getViewportMode()).toBe("desktop");
    });
});
