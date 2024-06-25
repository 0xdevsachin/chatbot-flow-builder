import { Handle, NodeProps, Position } from "reactflow";
import ConditionalWrapper from "../conditional-wrapper";
import { NodeTypesEnum } from "../../constants";

import {
  NodeContainer,
  NodeContentContainer,
  NodeTopContainer,
} from "./node.style";
import { useGlobalContext } from "../../context";

const CustomNode = (data: NodeProps) => {
  const {
    state: { nodeId },
  } = useGlobalContext();

  return (
    <NodeContainer isSelected={nodeId === data.id}>
      <ConditionalWrapper
        showChild={
          data.data.nodeType === NodeTypesEnum.default ||
          data.data.nodeType === NodeTypesEnum.input
        }
      >
        <Handle type="target" position={Position.Right} isConnectable />
      </ConditionalWrapper>
      <NodeTopContainer>
        <div>{data.data.nodeHeading}</div>
      </NodeTopContainer>
      <NodeContentContainer>{data.data.label}</NodeContentContainer>
      <ConditionalWrapper
        showChild={
          data.data.nodeType === NodeTypesEnum.default ||
          data.data.nodeType === NodeTypesEnum.output
        }
      >
        <Handle type="source" position={Position.Left} isConnectable />
      </ConditionalWrapper>
    </NodeContainer>
  );
};

export default CustomNode;
