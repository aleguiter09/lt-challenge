import "@/styles/global.scss";
import { Card } from "@/components/Card/Card";
import { Modal } from "./components/Modal/Modal";
import { ListProvider } from "./context/ListProvider";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ListProvider>
      <Card setIsOpen={setIsOpen} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />;
    </ListProvider>
  );
}

export default App;
