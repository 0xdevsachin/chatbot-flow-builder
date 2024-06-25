import {
  NodeBox,
  NodeHeadingContainer,
  NodeInput,
  NodeSelectContainer,
  PanelContainer,
} from "./panel.style";
import { NodeTypesEnum } from "../../constants";
import { useGlobalContext } from "../../context";

const SidePanel = () => {
  const {
    state: { openPanel },
    nodeType,
    setNodeType,
    setNodeMessage,
    nodeMessage,
  } = useGlobalContext();

  if (openPanel) return null;
  return (
    <PanelContainer>
      <NodeBox draggable>
        <NodeHeadingContainer>
          <div>NodeType</div>
          <NodeSelectContainer
            onChange={(e) => setNodeType(e.target.value as NodeTypesEnum)}
            defaultValue={nodeType}
          >
            <option value={NodeTypesEnum.default}>Default</option>
            <option value={NodeTypesEnum.input}>Input</option>
            <option value={NodeTypesEnum.output}>Output</option>
          </NodeSelectContainer>
        </NodeHeadingContainer>
        <NodeInput
          placeholder="Enter Node Message"
          value={nodeMessage}
          onChange={(e) => setNodeMessage(e.target.value)}
        />
      </NodeBox>
    </PanelContainer>
  );
};

export default SidePanel;
