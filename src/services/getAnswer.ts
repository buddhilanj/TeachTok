import APIBulder from "@/api/APIBulder";

export function getAnswer(id: string) {
  const url = "/reveal";
  const params = { id };
  return APIBulder.API.get(url, { params });
}
