export interface Content {
  type: "flashcard" | "mcq";
  id: number;
  playlist: string;
  description: string;
  user?: User;
}
export interface User {
  name: string;
  avatar: string;
}
