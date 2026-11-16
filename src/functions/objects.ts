import type { Slide } from "@/types/slide.js";
import { generateId } from "./id.js";

function addTextObject(
	slide: Slide,
	content: string,
	x: number,
	y: number,
	width: number,
	height: number,
	fontFamily: string,
	fontSize: number,
	fontColor: string,
): Slide {
	const object = {
		id: generateId(),
		x,
		y,
		width,
		height,
		type: "text" as const,
		content,
		fontFamily,
		fontSize,
		fontColor,
	};
	return { ...slide, objects: [...slide.objects, object] };
}

function addImageObject(
	slide: Slide,
	url: string,
	x: number,
	y: number,
	width: number,
	height: number,
): Slide {
	const object = {
		id: generateId(),
		x,
		y,
		width,
		height,
		type: "image" as const,
		src: url,
	};
	return {
		...slide,
		objects: [...slide.objects, object],
	};
}

function removeObject(slide: Slide, objectId: string): Slide {
	const index = slide.objects.findIndex((object) => object.id === objectId);
	if (index === -1) {
		return slide;
	}

	const newObjects = [...slide.objects];

	newObjects.splice(index, 1);

	return {
		...slide,
		objects: newObjects,
	};
}

function moveObject(
	slide: Slide,
	objectId: string,
	newX: number,
	newY: number,
): Slide {
	const newObjects = [...slide.objects];

	const object = newObjects.find((object) => object.id === objectId);
	if (!object) {
		return slide;
	}

	object.x = newX;
	object.y = newY;

	return {
		...slide,
		objects: newObjects,
	};
}

function resizeObject(
	slide: Slide,
	objectId: string,
	newWidth: number,
	newHeight: number,
): Slide {
	const newObjects = [...slide.objects];

	const object = newObjects.find((object) => object.id === objectId);
	if (!object) {
		return slide;
	}

	object.width = newWidth;
	object.height = newHeight;

	return {
		...slide,
		objects: newObjects,
	};
}

function updateTextObjectStyle(
	slide: Slide,
	objectId: string,
	fontFamily: string,
	fontSize: number,
	fontColor: string,
): Slide {
	const newObjects = [...slide.objects];

	const object = newObjects.find((object) => object.id === objectId);
	if (object?.type !== "text") {
		return slide;
	}

	object.fontFamily = fontFamily;
	object.fontSize = fontSize;
	object.fontColor = fontColor;

	return {
		...slide,
		objects: newObjects,
	};
}

export {
	addImageObject,
	addTextObject,
	moveObject,
	removeObject,
	resizeObject,
	updateTextObjectStyle,
};
