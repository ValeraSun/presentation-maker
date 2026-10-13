import { Slide } from "../types/slide";
import { Presentation } from "../types/presentation";
import { generateId } from "./id";

function isSlide(object: any): boolean{
    return   (object !== null && typeof object === "object") &&
    (object.id !== null && typeof object.id === "string") &&
    (object.name !== null && typeof object.name === "string")
}

function addSlide(presentation: Presentation, slideName?: string): Presentation {
    const newPresentaion =  structuredClone(presentation)
    const newSlide = {
        id: generateId(),
        name: slideName ?? '',
    }

    newPresentaion.slides.push(newSlide)

    return newPresentaion
}

function removeSlides(presentation: Presentation, indexesToRemove: string[]): Presentation {
    const newPresentaion =  structuredClone(presentation)

    const removeSet = new Set(indexesToRemove);

    newPresentaion.slides = newPresentaion.slides.filter((_, index) => !removeSet.has(index));
}

export { isSlide, addSlide, removeSlides }