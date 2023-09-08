import { Content } from "./Content";

export interface ContentView extends Content {
  loading: "idle" | "loading" | "success" | "error";
  requestId: string;
}
