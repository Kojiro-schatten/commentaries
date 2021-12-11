import { ChangeEventHandler, useState } from "react";

type ToggleProps = {
  left: { label: string; value: string };
  right: { label: string; value: string };
  onChange: (value: string) => void;
};

const Toggle = (props: ToggleProps) => {
  console.log(props.left, props.right, props?.onChange)
  const [checked, setChecked] = useState(props.left.value);
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setChecked(event.target.value);
    props?.onChange(event.target.value);
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
export default Toggle;