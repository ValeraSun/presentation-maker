type Slide = {
  id: string;
  name: string;
}


type Background  = ImageBackground | ColorBackground

type ImageBackground = {
    type: "image",
    src: string,
}

type ColorBackground = {
    type: "color",
    color: string,
}

export { Background, Slide }