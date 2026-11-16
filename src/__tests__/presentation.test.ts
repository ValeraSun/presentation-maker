import { describe, expect, it } from "vitest";
import {
	createPresentation,
	updatePresentationName,
} from "../functions/presentation.js";

describe("createPresentationBlanked", () => {
	it("should create a presentation with default slide", () => {
		const presentation = createPresentation("My Presentation");
		expect(presentation.name).toBe("My Presentation");
		expect(presentation.slides.length).toBe(1);
	});
});

describe("createPresentation", () => {
	it("should create a presentation with default slide", () => {
		const presentation = createPresentation("");
		expect(presentation.name).toBe("");
		expect(presentation.slides.length).toBe(1);
	});
});
