import type { Presentation } from "../types/presentation";
import { generateId } from "./id";
import { isSlide } from "./slide";

function createPresentation(name: string): Presentation {
    return  {
        id: generateId(),
        name: name,
        slides: [],
    }
}

function updatePresentationName(presentation: Presentation, name: string): Presentation {
    const newPresentaion = structuredClone(presentation) 
    newPresentaion.name = name
    return newPresentaion       
}

function savePresentation(presentation: Presentation): string{
    return JSON.stringify(presentation)
}

function isPresentation(object: any): boolean {
    return typeof object == "object" &&
    typeof object.id === "string" &&
    typeof object.name === "string" &&
    Array.isArray(object.slides)&&
    object.slides.every(isSlide)
}

function loadPresentation(json: string): Presentation | null{
    const loaded = JSON.parse(json)
    if (isPresentation(loaded)){
        return loaded
    } else {
        return null
    }
    
}