import APIBulder from "@/api/APIBulder";

export function getFollowing() {
  const url = "/following";
  return APIBulder.API.get(url);
}
