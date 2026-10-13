type SlideObject = TextObject | ImageObject

type TextObject = {
    type: "text",
    text: string,
}

type ImageObject = {
    type: "image",
    src: string,
}

export { SlideObject }
