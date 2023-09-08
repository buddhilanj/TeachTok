import APIBulder from "@/api/APIBulder";

export function getForYou() {
  const url = "/for_you";
  return APIBulder.API.get(url);
}
