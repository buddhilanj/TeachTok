import { Content, isContent } from "./Content";
type LoadingType = "loading" | "success" | "error";
export interface ContentView {
  loading: LoadingType;
  requestId: string;
  content: Content | null;
}

export function isLoadingType(value: any): value is LoadingType {
  return value === "loading" || value === "success" || value === "error";
}

export function isContentView(object: unknown): object is ContentView {
  if (
    typeof object === "object" &&
    object !== null &&
    "loading" in object &&
    "requestId" in object &&
    "content" in object
  ) {
    return isLoadingType(object.loading) &&
      typeof object.requestId === "string" &&
      object.loading === "success"
      ? isContent(object.content)
      : object.content === null;
  }
  return false;
}
