import type { Presentation } from "../types/presentation.js";
import type { Slide } from "../types/slide.js";
import { generateId } from "./id.js";

function isSlide(object: unknown): object is Slide {
	const candidate = object as
		| Partial<Record<keyof Presentation, unknown>>
		| null
		| undefined;
	return (
		typeof candidate === "object" &&
		candidate !== null &&
		typeof candidate?.id === "string" &&
		typeof candidate?.name === "string"
	);
}

function createDefaultSlide(slideName: string): Slide {
	return {
		id: generateId(),
		name: slideName,
		background: { type: "none" },
		objects: [],
	};
}

function addSlide(
	presentation: Presentation,
	slideName?: string,
): Presentation {
	const newSlide = createDefaultSlide(
		slideName || `Слайд ${presentation.slides.length + 1}`,
	);
	return {
		...presentation,
		activeSlideId: newSlide.id,
		slides: [...presentation.slides, newSlide],
	};
}

function removeSlides(
	presentation: Presentation,
	indexesToRemove: string[],
): Presentation {
	const removeSet = new Set(indexesToRemove);

	const newSlides = presentation.slides.filter(
		(slide) => !removeSet.has(slide.id),
	);

	return {
		...presentation,
		slides: newSlides,
	};
}

function moveSlide(
	presentation: Presentation,
	slideId: string,
	newIndex: number,
): Presentation {
	const currentIndex = presentation.slides.findIndex(
		(slide) => slide.id === slideId,
	);

	if (currentIndex === -1 || currentIndex === newIndex) {
		return presentation;
	}

	const newSlides = [...presentation.slides];
	const [movedSlide] = newSlides.splice(currentIndex, 1);

	if (!movedSlide) {
		return presentation;
	}

	const normalizeIndex = Math.max(0, Math.min(newIndex, newSlides.length));
	newSlides.splice(normalizeIndex, 0, movedSlide);

	return {
		...presentation,
		slides: newSlides,
	};
}

function setActiveSlide(
	presentation: Presentation,
	slideId: string,
): Presentation {
	return {
		...presentation,
		activeSlideId: slideId,
	};
}

function duplicateSlide(
	presentation: Presentation,
	slideId: string,
): Presentation {
	const newSlides = [...presentation.slides];

	const original = newSlides.find((slide) => (slide.id = slideId));
	if (!original) {
		return presentation;
	}

	const originalIndex = newSlides.indexOf(original);
	if (originalIndex === -1) {
		return presentation;
	}

	const newIndex = originalIndex + 1;
	const normalizeIndex = Math.max(0, Math.min(newIndex, newSlides.length));

	const duplicate = structuredClone(original);
	duplicate.id = generateId();

	newSlides.splice(normalizeIndex, 0, duplicate);

	return {
		...presentation,
		slides: newSlides,
	};
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
	return {
		...slide,
		background: {
			type: "color",
			color,
		},
	};
}

function setSlideBackgroundImage(slide: Slide, url: string): Slide {
	return {
		...slide,
		background: {
			type: "image",
			src: url,
		},
	};
}

function setSlideBackgroundGradient(
	slide: Slide,
	colors: string[],
	angle?: number,
): Slide {
	return {
		...slide,
		background: {
			type: "gradient",
			colors,
			angle: angle ?? null,
		},
	};
}

function clearSlideBackground(slide: Slide): Slide {
	return {
		...slide,
		background: {
			type: "none",
		},
	};
}

export {
	addSlide,
	clearSlideBackground,
	duplicateSlide,
	isSlide,
	moveSlide,
	removeSlides,
	setActiveSlide,
	setSlideBackgroundColor,
	setSlideBackgroundGradient,
	setSlideBackgroundImage,
};
