// https://riotz.works/articles/lopburny/2019/08/28/using-typescript-re-export-and-import-syntax-to-improve-module-arrangement/
import challenge from "../pages/challenges.json";

export type Challenge = typeof challenge[0];
