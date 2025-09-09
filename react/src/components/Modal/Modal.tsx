import { useState } from "react";
import "./Modal.scss";
import { useList } from "@/context/useList";

export const Modal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  const [value, setValue] = useState("");
  const { dispatch } = useList();

  return (
    <div className={`modal ${isOpen ? "show" : ""}`}>
      <div className="modal-content">
        <label className="regular" htmlFor="modalInput">
          Add item to list
        </label>
        <input
          className="modal-input regular"
          type="text"
          placeholder="Type the text here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="modal-actions">
          <button
            className="btn primary medium"
            onClick={() => {
              if (value.trim()) {
                dispatch({ type: "ADD_ITEM", payload: value.trim() });
                setValue("");
                setIsOpen(false);
              }
            }}
          >
            Add
          </button>
          <button className="btn medium" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
