import { Controls } from "../Controls/Controls";
import { List } from "../List/List";
import "./Card.scss";

export function Card({
  setIsOpen,
}: Readonly<{ setIsOpen: (v: boolean) => void }>) {
  return (
    <div className="card">
      <h1 className="title">This is a technical proof</h1>
      <p className="description regular">
        Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec
        inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc,
        hendrerit posuere augue fames dictumst placerat porttitor, dis mi
        pharetra vestibulum venenatis phasellus.
      </p>

      <List />
      <Controls setIsOpen={setIsOpen} />
    </div>
  );
}
