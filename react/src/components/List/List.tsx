import { useList } from "@/context/useList";
import "./List.scss";

export const List = () => {
  const { state, dispatch } = useList();

  return (
    <ul id="list" className="list">
      {state.items.map((item, index) => (
        <li
          key={item}
          className={state.selected.includes(index) ? " selected" : ""}
        >
          <button
            className="reset-btn regular"
            onClick={() => dispatch({ type: "TOGGLE_SELECT", payload: index })}
            onDoubleClick={() =>
              dispatch({ type: "REMOVE_ITEM", payload: index })
            }
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};
