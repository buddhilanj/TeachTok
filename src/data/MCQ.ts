import { Content, isContent } from "./Content";

export interface MCQ extends Content {
  image: string;
  question: string;
  options: MCQOptions[];
}

export interface MCQOptions {
  id: string;
  answer: string;
}

export function isContentMCQ(content: Content): content is MCQ {
  return content.type === "mcq";
}

export function isMCQOption(object: unknown): object is MCQOptions {
  if (
    object !== null && typeof object === "object" &&
    "id" in object &&
    "answer" in object
  ) {
    return typeof object.id === "string" && typeof object.answer === "string";
  }
  return false;
}

function hasMCQPropTypes(object: object): object is MCQ {
  if ("image" in object && "question" in object && "options" in object) {
    return (
      typeof object.image === "string" &&
      typeof object.question === "string" &&
      Array.isArray(object.options) && object.options.every((option) => isMCQOption(option))
    );
  }
  return false;
}


export function isMCQ(object: unknown): object is MCQ {
  return isContent(object) && isContentMCQ(object) && hasMCQPropTypes(object);
}

export function isContentValidMCQ(content: Content): content is MCQ {
  return isContentMCQ(content) && hasMCQPropTypes(content);
}
