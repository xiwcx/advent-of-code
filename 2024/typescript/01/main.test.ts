import { assertEquals } from "@std/assert";
import { getTotalDistance, getSimilarityScore } from "./main.ts";
import { example, myInput } from "./data.ts";

Deno.test("gets total distance", () => {
  assertEquals(getTotalDistance(example), 11);
  assertEquals(getTotalDistance(myInput), 1722302);
});

Deno.test("gets similarity score", () => {
  assertEquals(getSimilarityScore(example), 31);
  assertEquals(getSimilarityScore(myInput), 20373490);
});
