import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { NodeTypesEnum } from "../constants";
import { Edge } from "reactflow";

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
  status: { type: string; message: string };
  setStatus: Dispatch<SetStateAction<{ type: string; message: string }>>;
  allNodesConnected: boolean;
  setAllNodesConnected: Dispatch<SetStateAction<boolean>>;
  node: Node[];
  edges: Edge[];
  setNode: any;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  handleSaveClick: () => void;
};

const GlobalContext = createContext<IGlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialNodes = JSON.parse(localStorage.getItem("nodes") || "[]");
  const initialEdges: Edge[] = JSON.parse(
    localStorage.getItem("edges") || "[]"
  );
  const [state, setState] = useState<IStateType>({
    openPanel: false,
    nodeId: "",
    nodeHeading: "",
    nodeMessage: "",
  });
  const [nodeType, setNodeType] = useState<NodeTypesEnum>(NodeTypesEnum.input);
  const [nodeMessage, setNodeMessage] = useState("");
  const [allNodesConnected, setAllNodesConnected] = useState(true);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [node, setNode] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const handleSaveClick = () => {
    if (!allNodesConnected) {
      setStatus({
        type: "error",
        message: "Can't save flow",
      });
      return;
    }
    localStorage.setItem("nodes", JSON.stringify(node));
    localStorage.setItem("edges", JSON.stringify(edges));
    setStatus({ message: "Saved successfully", type: "success" });
  };

  return (
    <GlobalContext.Provider
      value={{
        node,
        edges,
        state,
        setNode,
        setState,
        setEdges,
        nodeType,
        setNodeType,
        nodeMessage,
        setNodeMessage,
        allNodesConnected,
        setAllNodesConnected,
        status,
        setStatus,
        handleSaveClick,
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
