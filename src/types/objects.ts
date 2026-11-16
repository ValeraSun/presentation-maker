type SlideObject = TextObject | ImageObject;

type BaseSlideObject = {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
};

type TextObject = BaseSlideObject & {
	type: "text";
	content: string;
	fontFamily: string;
	fontSize: number;
	fontColor: string;
};

type ImageObject = BaseSlideObject & {
	type: "image";
	src: string;
};

export type { SlideObject };
