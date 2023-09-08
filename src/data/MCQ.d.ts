import { Content } from "./Content";

export interface MCQ extends Content {
  image?: string;
  question?: string;
  options?: MCQOptions[];
}

export interface MCQOptions {
  id: string;
  answer: string;
}
