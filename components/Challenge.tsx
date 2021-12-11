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
          color: #5db400;
        }
        .ModalButton {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.5;
          position: relative;
          display: inline-block;
          padding: 1rem 4rem;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-transition: all 0.3s;
          transition: all 0.3s;
          text-align: center;
          vertical-align: middle;
          text-decoration: none;
          letter-spacing: 0.1em;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          background-color: #5db400;
        }
      `}</style>
      <div
        style={{
          width: 560,
          height: 315,
          border: "1px solid red"
        }}
        className={"Challenge"}
      >
        <button onClick={showModal} className={"ModalButton"}>
          {props.challenge_name}の回答を見る
        </button>
      </div>
    </>
  );
};

export default Challenge;
