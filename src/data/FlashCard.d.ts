import { Content } from "./Content";

export interface FlashCard extends Content {
  flashcard_front?: string;
  flashcard_back?: string;
}
