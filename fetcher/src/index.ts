// https://sheetson.com/ を使用して、spreadsheetにある解説をfetchさせるようにする

import fetch from "node-fetch";

export type Challenge = {
  rowIndex: number;
  challenge_name: string;
  challenge_url: string;
  challenge_example: string;
  challenge_commentary: string;
  challenge_type: string;
};
type RawChallenge = {
  rowIndex: number;
  チャレンジ名: string;
  URL: string;
  example: string;
  解説: string;
  タイプ: string;
};
const formatChallenge = (rawChallenge: RawChallenge): Challenge => {
  console.log(rawChallenge);
  return {
    rowIndex: rawChallenge.rowIndex,
    challenge_name: rawChallenge.チャレンジ名,
    challenge_url: rawChallenge.URL,
    challenge_example: rawChallenge.example,
    challenge_commentary: rawChallenge.解説,
    challenge_type: rawChallenge.タイプ
  };
};
export const fetchSpreadsheet = async (): Promise<Challenge[]> => {
  // const API_KEY = process.env.ENV_SHEETSON;
  const API_KEY = "AOxF4gKsKllic65BITnOeMjdu4HRTjQH510j1C18JvpBXL0sU-l0BG0qN4w";
  const API_ENDPOINT = `https://api.sheetson.com/v2/sheets/シート1`;
  const SPREADSHEET_ID = "1i7gE0r9Els-WmXokVo-tRBPHCJ80NS6jf_9RuEaBlTY";
  const results: Challenge[] = [];
  let currentCursor = 0;
  while (true) {
    const url = API_ENDPOINT + `?skip=${currentCursor}&limit=100`;
    // const url = API_ENDPOINT;
    console.log("[fetchSpreadsheet] fetch", url);
    const result = (await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "X-Spreadsheet-Id": SPREADSHEET_ID
      }
    }).then((res: { json: () => any }) => res.json())) as { results: RawChallenge[]; hasNextPage: boolean };
    currentCursor += 100 + 1;
    results.push(...result.results.map((item) => formatChallenge(item)));
    if (!result.hasNextPage) {
      break;
    }
  }
  console.log("[fetchSpreadsheet] fetched total rows", results.length);
  console.log("fetchSpreadSheet!!", results);
  return results;
};
