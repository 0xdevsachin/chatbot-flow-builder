import React from "react";
import { Node } from "reactflow";
import { NodeData } from "../../types";
import {
  NodeInput,
  NodeTextAreaInput,
  PanelContainer,
} from "../side-panel/panel.style";
import { useGlobalContext } from "../../context";
import { IoArrowBackOutline } from "react-icons/io5";

interface SettingsPanelProps {
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;
  nodeId: string;
}

const SettingsPanel = ({ setNodes, nodeId }: SettingsPanelProps) => {
  const {
    state: { openPanel, nodeMessage, nodeHeading },
    setState,
  } = useGlobalContext();
  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    updateType: "label" | "nodeHeading"
  ) => {
    const newText = event.target.value;
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, [updateType]: newText } }
          : n
      )
    );
    if (updateType === "label") {
      setState((prev) => ({ ...prev, nodeMessage: newText }));
      return;
    }
    setState((prev) => ({ ...prev, nodeHeading: newText }));
  };

  if (!openPanel) return null;
  return (
    <PanelContainer>
      <div
        onClick={() =>
          setState((prev) => ({ ...prev, openPanel: false, nodeId: "" }))
        }
      >
        <IoArrowBackOutline />
      </div>
      <NodeInput
        value={nodeHeading}
        onChange={(e) => handleTextChange(e, "nodeHeading")}
      />
      <NodeTextAreaInput
        rows={5}
        value={nodeMessage}
        onChange={(e) => handleTextChange(e, "label")}
      />
    </PanelContainer>
  );
};

export default SettingsPanel;
