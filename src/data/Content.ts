import { isFlashCard } from "./FlashCard";
import { isMCQ } from "./MCQ";

type ContentCardType = "flashcard" | "mcq";

export interface Content {
  type: ContentCardType;
  id: number;
  playlist: string;
  description: string;
  user: User;
}
export interface User {
  name: string;
  avatar: string;
}

export function isContentCardType(value: any): value is ContentCardType {
  return value === "flashcard" || value === "mcq";
}

export function isContent(object: any): object is Content {
  if (
    typeof object === "object" &&
    object !== null &&
    "type" in object &&
    "id" in object &&
    "playlist" in object &&
    "description" in object &&
    "user" in object
  ) {
    return (
      isContentCardType(object.type) &&
      typeof object.id === "number" &&
      typeof object.playlist === "string" &&
      typeof object.description === "string" &&
      isUser(object.user)
    );
  }

  return false;
}

export function isUser(object: any): object is User {
  if (
    typeof object === "object" &&
    object !== null &&
    "name" in object &&
    "avatar" in object
  ) {
    return typeof object.name === "string" && typeof object.avatar === "string";
  }
  return false;
}

export function isValidContent(object: unknown): object is Content {
  return isFlashCard(object) || isMCQ(object);
}
