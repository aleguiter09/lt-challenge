import { useList } from "@/context/useList";
import "./List.scss";

export const List = () => {
  const { state, dispatch } = useList();

  return (
    <ul id="list" className="list">
      {state.items.map((item, index) => (
        <li
          key={item + index + new Date().getTime()} // Idealmente la key seria un ID único relacionado al item o generado con una libreria como UUID.
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
