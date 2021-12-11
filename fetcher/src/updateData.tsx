import { fileURLToPath } from "url";
import path from "path";
import * as fs from "fs/promises";
import { Challenge, fetchSpreadsheet } from "./index";

type Result = Challenge;
const results = (await fetchSpreadsheet(), {
  concurrency: 4
}) as unknown as Result[];

console.log("whre am i", results);
const abcd = [
  {
    rowIndex: 2,
    challenge_name: "Pick",
    challenge_url: "https://github.com/type-challenges/type-challenges/blob/master/questions/4-easy-pick/README.md",
    challenge_example: "type MyPick<T, K extends keyof T> = {[key in K]: T[key]}",
    challenge_commentary: "ここに解説が入ります",
    challenge_type: "type_challenges"
  }
];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "./challenges.json");
fs.writeFile(OUTPUT_PATH, JSON.stringify(abcd, null, 2), "utf8");
