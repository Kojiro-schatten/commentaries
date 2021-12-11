import { InView } from "react-intersection-observer";
import Image from "next/image";
import challenge from '../pages/challenges.json'
import { useMemo } from "react";

const LeftContent = (props: typeof challenge[0]) => {
  const typeChallengeUrl = useMemo(() => {
    return `${props.challenge_url}`;
  }, [props.challenge_url]);

  const onLoad = () => {};
  const onError = () => {};
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
                opacity: 0.7,
                position: "relative"
              }}
            >
              <div
                style={{
                  padding: "0.15rem 1.5rem",
                  position: "absolute",
                  zIndex: 1
                }}
              >
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 30,
                    color: "#ffffff",
                    WebkitTextStroke: "1px #0078b4"
                  }}
                >
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
                  onError={onError}
                />
              </a>
            </div>
          </>
        );
      }}
    </InView>
  );
};
export default LeftContent;