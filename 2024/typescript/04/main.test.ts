import { assertEquals } from "@std/assert";
import { partOne, partTwo } from "./main.ts";
import { example, myInput } from "./data.ts";

Deno.test("part one", () => {
  assertEquals(partOne(example), 18);
  assertEquals(partOne(myInput), 2483);
});

Deno.test("part two", () => {
  assertEquals(partTwo(example), 9);
  assertEquals(partTwo(myInput), 1925);
});
