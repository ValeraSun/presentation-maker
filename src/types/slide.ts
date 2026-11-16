import type { SlideObject } from "./objects.js";

type Slide = {
	id: string;
	name: string;
	background: Background;
	objects: SlideObject[];
};

type Background =
	| ImageBackground
	| ColorBackground
	| GradientBackground
	| NoneBackground;

type ImageBackground = {
	type: "image";
	src: string;
};

type ColorBackground = {
	type: "color";
	color: string;
};

type GradientBackground = {
	type: "gradient";
	colors: string[];
	angle: number | null;
};

type NoneBackground = {
	type: "none";
};

export type { Background, Slide };
