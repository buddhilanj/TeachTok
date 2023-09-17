import { Content, isContent } from "./Content";

export interface FlashCard extends Content {
  flashcard_front: string;
  flashcard_back: string;
}

export function isContentFlashCard(content: Content): content is FlashCard {
  return content.type === "flashcard";
}

function hasFlashCardPropTypes(content: Content): content is FlashCard {
  if ("flashcard_front" in content && "flashcard_back" in content) {
    return (
      typeof content.flashcard_front === "string" &&
      typeof content.flashcard_back === "string"
    );
  }
  return false;
}

export function isFlashCard(object: unknown): object is FlashCard {
  return (
    isContent(object) &&
    isContentFlashCard(object) &&
    hasFlashCardPropTypes(object)
  );
}

export function isContentValidFlashCard(
  content: Content,
): content is FlashCard {
  return isContentFlashCard(content) && hasFlashCardPropTypes(content);
}
