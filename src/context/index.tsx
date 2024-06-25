import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { NodeTypesEnum } from "../constants";

type IStateType = {
  openPanel: boolean;
  nodeId: string;
  nodeMessage: string;
  nodeHeading: string;
};

type IGlobalContextType = {
  state: IStateType;
  setState: Dispatch<SetStateAction<IStateType>>;
  nodeType: NodeTypesEnum;
  setNodeType: Dispatch<SetStateAction<NodeTypesEnum>>;
  nodeMessage: string;
  setNodeMessage: Dispatch<SetStateAction<string>>;
  allNodesConnected: boolean;
  setAllNodesConnected: Dispatch<SetStateAction<boolean>>;
};

const GlobalContext = createContext<IGlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState<IStateType>({
    openPanel: false,
    nodeId: "",
    nodeHeading: "",
    nodeMessage: "",
  });
  const [nodeType, setNodeType] = useState<NodeTypesEnum>(
    NodeTypesEnum.default
  );
  const [nodeMessage, setNodeMessage] = useState("");
  const [allNodesConnected, setAllNodesConnected] = useState(true);
  return (
    <GlobalContext.Provider
      value={{
        state,
        setState,
        nodeType,
        setNodeType,
        nodeMessage,
        setNodeMessage,
        allNodesConnected,
        setAllNodesConnected,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): IGlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("Context must be use within its provider");
  return context;
};
