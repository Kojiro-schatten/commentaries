import { Challenge } from "../types/index";
import Modal from "react-modal";
import { useModal } from "react-modal-hook";

Modal.setAppElement("#__next");

const Challenge = (props: Challenge) => {
  console.log(props);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  // showModal,hideModalそのまま渡すことで、react-modal-hook側で勝手にtrue/falseのスイッチ判定を行ってくれる
  const [showModal, hideModal] = useModal(() => {
    console.log(showModal, hideModal);
    return (
      <Modal isOpen style={customStyles} contentLabel="Example Modal">
        <h2>解説</h2>
        <div>{props.example}</div>
        <p>{props.commentary}</p>
        <button onClick={hideModal}>Close</button>
      </Modal>
    );
  });

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
        {/* <Commentary {...props} /> */}
        {/* <button onClick={openModal}>Open Modal</button> */}
        <h1>
          <a href={props.challenge_url}>{props.challenge_name}</a>
        </h1>
        <button onClick={showModal}>Show modal</button>

      </div>
    </>
  );
};

export default Challenge;