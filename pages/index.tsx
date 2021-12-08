import challenge from "./challenges.json";
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import Image from "next/image";
import Commentary from './Components/Commentary';
import { Challenge } from '../types/index';

// プロジェクトのモジュールをグローバルに宣言する。
// declare module "react" しているのは、next内でstyled-componentsを使っているから
// グローバルなCSSを適用する際には、styleってなに？って指摘されるのでグローバル宣言をすることで、解決する
declare module "react" {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

const Challenge = (props: Challenge) => {
  return (
    <>
      <style jsx>{`
        .Challenge {
          background-color: white;
          display: grid;
          flex-direction: column;
          place-items: center;
        }
        .Challenge a {
          color: #0078b4;
        }
      `}</style>
      <div
        style={{
          // props.xxにしてもOK
          width: 560,
          height: 315,
          border: "1px solid red"
        }}
        className={"Challenge"}
      >
        <Commentary {...props} />
        <h1>
          <a href={props.challenge_url}>{props.challenge_name}</a>
        </h1>
      </div>
    </>
  );
};

const LeftContent = (props: typeof challenge[0]) => {

  const typeChallengeUrl = useMemo(() => {
    return `${props.challenge_url}`
  }, [props.challenge_url]);

  const onLoad = () => {}
  const onError = () => {}
  return (
    <InView delay={0} threshold={0.1}>
      {({ inView, ref }) => {
        return (
          <>
          <div
            ref={ref}
            style={{
              display: "inline-block",
              border: "0px none",
              background: "rgba(0, 0, 0, 0.1) none repeat scroll 0% 0% padding-box; margin: 0px",
              padding: 0,
              borderRadius: "6px",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 40px",
              margin: "4px",
              visibility: inView ? "visible" : "hidden",
              opacity: 0.70,
              position: "relative"
            }}
          >
            <div style={{
              padding: "0.15rem 1.5rem",
              position: "absolute",
              zIndex: 1
            }}>
              <p style={{
                fontWeight: 600,
                fontSize: 30,
                color: "#ffffff",
                WebkitTextStroke: "1px #0078b4",
              }}>
                {props.challenge_name}
              </p>
            </div>

            <a href={typeChallengeUrl} target={"_blank"} rel="noreferrer">
              <Image
                width={560}
                height={315}
                alt={props.challenge_name}
                src={`https://picsum.photos/315/560?grayscale`}
                loading={"lazy"}
                onLoad={onLoad}
                onError={onError} />
            </a>

          </div>
          </>
        );
      }}
    </InView>
  );
};

type ToggleProps = {
  left: { label: string; value: string };
  right: { label: string; value: string };
  onChange: (value: string) => void;
};

const Toggle = (props: ToggleProps) => {
  const [checked, setChecked] = useState(props.left.value);
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setChecked(event.target.value);
    props.onChange(event.target.value);
  };
  return (
    <>
      <style jsx>{`
        .switch-field {
          font-family: sans-serif;
          overflow: hidden;
        }
        .switch-title {
          font-weight: bold;
          margin-bottom: 6px;
        }
        .switch-field input {
          position: absolute !important;
          clip: rect(0, 0, 0, 0);
          height: 1px;
          width: 1px;
          border: 0;
          overflow: hidden;
        }
        .switch-field label {
          display: inline-block;
          width: 100px;
          background-color: #e4e4e4;
          color: rgba(0, 0, 0, 0.6);
          font-size: 14px;
          font-weight: normal;
          text-align: center;
          text-shadow: none;
          padding: 6px 14px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.1s ease-in-out;
        }
        .switch-field label:hover {
          cursor: pointer;
        }
        .switch-field input:checked + label {
          background-color: #1955a5;
          color: #fff;
          box-shadow: none;
        }
      `}</style>
      <form className="switch-field">
        <input
          type="radio"
          id="switch_left"
          name="switchToggle"
          value={props.left.value}
          onChange={onChange}
          checked={props.left.value === checked}
        />
        <label htmlFor="switch_left">{props.left.label}</label>
        <input
          type="radio"
          id="switch_right"
          name="switchToggle"
          value={props.right.value}
          onChange={onChange}
          checked={props.right.value === checked}
        />
        <label htmlFor="switch_right">{props.right.label}</label>
      </form>
    </>
  );
};

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
        .Footer {
          position: fixed;
          bottom: 0;
          width: 98%;
          margin: auto;
          font-size: 16px;
          padding: 0 8px;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.15);
        }
        .Footer {
          display: flex;
          justify-content: flex-end;
          align-content: center;
          align-items: center;
        }
        .FooterController,
        .FooterModeChanger,
        .FooterInformation {
          display: inline-block;
        }
        .FooterInformation {
          margin-left: auto;
        }
        .FooterControllerButton {
          appearance: none;
          border: 0;
          border-radius: 8px;
          background: transparent;
          padding: 8px 16px;
          font-size: 16px;
        }
        .LinkWithIcon {
          display: inline-flex;
          align-content: center;
          align-items: center;
          padding-right: 4px;
          font-size: 16px;
        }
      `}</style>
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
              <LeftContent {...c}/>
            </div>
          );
        })}
      </div>
      <footer className={"Footer"}>
        <div className={"FooterModeChanger"}>
          <Toggle
            left={{ label: "List", value: "list" }}
            right={{ label: "Grid", value: "grid" }}
            onChange={onChangeMode}
          />
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
