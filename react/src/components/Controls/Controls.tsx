import { useList } from "@/context/useList";
import "./Controls.scss";

export function Controls({
  setIsOpen,
}: Readonly<{ setIsOpen: (v: boolean) => void }>) {
  const { dispatch } = useList();

  return (
    <div className="controls">
      <div className="primary-controls">
        <button
          className="btn medium"
          onClick={() => dispatch({ type: "UNDO" })}
        >
          ⟲
        </button>
        <button
          className="btn medium"
          onClick={() => dispatch({ type: "REMOVE_SELECTED" })}
        >
          Delete
        </button>
      </div>
      <button className="btn primary medium" onClick={() => setIsOpen(true)}>
        Add
      </button>
    </div>
  );
}
