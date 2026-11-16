import type { Slide } from "./slide.js";

type Presentation = {
	activeSlideId: string | null;
	id: string;
	name: string;
	slides: Slide[];
};

export type { Presentation };
