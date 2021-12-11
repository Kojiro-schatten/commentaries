import challenge from "./challenges.json";
import { useCallback, useState } from "react";
import Challenge from "../components/Challenge";
import { ModalProvider } from "react-modal-hook";
import LeftContent from "../components/LeftContent";
import Toggle from "../components/Toggle";

// プロジェクトのモジュールをグローバルに宣言する。
// declare module "react" しているのは、next内でstyled-componentsを使っているから
// グローバルなCSSを適用する際には、styleってなに？って指摘されるのでグローバル宣言をすることで、解決する
declare module "react" {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

function HomePage() {
  const [mode, setMode] = useState<"list" | "grid">("list");
  const onChangeMode = useCallback((value: string) => {
    setMode(value as "list" | "grid");
  }, []);

  return (
    <div>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
      <style jsx>{`
        .Header {
          z-index: 1;
          display: flex;
          justify-content: flex-end;
          align-content: center;
          align-items: center;
          position: fixed;
          width: 98%;
          margin: auto;
          font-size: 18px;
          padding: 0 8px;
          color: #fff;
        }
        .Grid {
          display: grid;
          grid-gap: 10px;
          padding: 10px;
          margin: 1em 0 2em;
          overflow: hidden;
          justify-items: center;
        }
        .Grid--Grid {
          grid-template-columns: repeat(auto-fill, minmax(560px, 1fr));
        }
        .Grid--List {
          grid-template-columns: 1fr;
        }
        .Grid--List .GridItem {
          display: grid;
          grid-gap: 10px;
          padding: 10px;
          margin: 1em 0 2em;
          overflow: hidden;
          justify-items: center;
          align-items: center;
          grid-template-columns: 1fr 1fr;
        }
        .GridItem {
          padding: 10px;
        }
      `}</style>
      <header className={"Header"}>
        <div className={"HeaderModeChanger"}>
          <Toggle
            left={{ label: "解答付き", value: "list" }}
            right={{ label: "問題", value: "grid" }}
            onChange={onChangeMode}
          />
        </div>
      </header>
      <div className={`Grid ${mode === "list" ? "Grid--List" : "Grid--Grid"}`}>
        {challenge.map((c) => {
          if (mode === "list") {
            return (
              <div className={"GridItem"} key={c.rowIndex}>
                <LeftContent {...c} />
                <Challenge {...c} />
              </div>
            );
          }
          return (
            <div key={c.rowIndex} className={"GridItem"}>
              <LeftContent {...c} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Home = () => (
  <ModalProvider>
    <HomePage />
  </ModalProvider>
);
export default Home;
