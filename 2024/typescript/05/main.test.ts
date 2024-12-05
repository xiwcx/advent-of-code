import { assertEquals } from "jsr:@std/assert";
import { example, myInput } from "./data.ts";
import { partOne, partTwo } from "./main.ts";

Deno.test("part one", () => {
  assertEquals(partOne(example), 143);
  assertEquals(partOne(myInput), 5129);
});

Deno.test("part two", () => {
  assertEquals(partTwo(example), 123);
  assertEquals(partTwo(myInput), 4077);
});
