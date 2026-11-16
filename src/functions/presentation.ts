import type { Presentation } from "../types/presentation.js";
import { generateId } from "./id.js";
import { isSlide } from "./slide.js";

function createPresentation(name: string): Presentation {
	return {
		id: generateId(),
		activeSlideId: null,
		name: name,
		slides: [],
	};
}

function updatePresentationName(
	presentation: Presentation,
	name: string,
): Presentation {
	return {
		...presentation,
		name,
	};
}

function savePresentation(presentation: Presentation): string {
	return JSON.stringify(presentation);
}

function isPresentation(object: unknown): object is Presentation {
	const candidate = object as
		| Partial<Record<keyof Presentation, unknown>>
		| null
		| undefined;

	return (
		typeof candidate === "object" &&
		candidate !== null &&
		typeof candidate?.id === "string" &&
		typeof candidate?.name === "string" &&
		Array.isArray(candidate?.slides) &&
		candidate.slides.every(isSlide)
	);
}

function loadPresentation(json: string): Presentation | null {
	const loaded = JSON.parse(json);
	if (isPresentation(loaded)) {
		return loaded;
	} else {
		return null;
	}
}

export {
	createPresentation,
	isPresentation,
	loadPresentation,
	savePresentation,
	updatePresentationName,
};
