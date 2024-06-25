import { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  Background,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeTypes,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { FlowBuilderContainer } from "./flowbuilder.style";
import SidePanel from "../side-panel";
import CustomNode from "../custom-node";
import SettingsPanel from "../settings-panel";
import { useGlobalContext } from "../../context";
import ConditionalWrapper from "../conditional-wrapper";

const nodeTypes: NodeTypes = {
  default: CustomNode,
};

const Flow = () => {
  const {
    setState,
    state,
    nodeType,
    nodeMessage,
    setAllNodesConnected,
    node: nodes,
    setEdges,
    setNode: setNodes,
    edges,
    setStatus,
  } = useGlobalContext();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds: Node[]) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Node Click handle to show drawer where user can edit and update node text messages

  const handleNodeClick = useCallback(
    (
      event: React.MouseEvent<Element, MouseEvent>,
      node: Node<any, string | undefined>
    ) => {
      event.preventDefault();
      setStatus({ type: "", message: "" });
      setState({
        nodeId: node.id,
        openPanel: true,
        nodeHeading: node.data.nodeHeading,
        nodeMessage: node.data.label,
      });
    },
    []
  );

  const onPaneClick = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      setStatus({ type: "", message: "" });
      setState((prev) => ({ ...prev, nodeId: "", openPanel: false }));
    },
    []
  );

  // Drag Event Handlers

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setStatus({ type: "", message: "" });
      const element: Node = {
        id: uuidv4(),
        data: {
          label: nodeMessage || `test message ${nodes.length + 1}`,
          nodeType,
          nodeHeading: nodeType,
        },
        position: { x: e.clientX, y: e.clientY },
        type: "default",
      };
      setNodes((prevNodes: Node[]) => [...prevNodes, element]);
    },
    [nodeMessage, nodeType, nodes.length, setNodes]
  );

  // Drag Event Handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setNodes((elements: Node[]) => {
      const element = elements[elements.length - 1];
      const newArray = elements.filter((items) => items.id !== element.id);
      return [
        ...newArray,
        { ...element, position: { x: e.clientX, y: e.clientY } },
      ];
    });
  }, []);

  // Drag Event Handlers
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setNodes((elements: Node[]) => {
      const element = elements[elements.length - 1];
      const newArray = elements.filter((items) => items.id !== element.id);
      return [
        ...newArray,
        { ...element, position: { x: e.clientX, y: e.clientY } },
      ];
    });
  }, []);

  const validateConnectivity = (nodes: Node[], edges: Edge[]): boolean => {
    const nodeIds = nodes.map((node) => node.id);
    for (let i = 0; i < nodes.length; i++) {
      const currentNodeId = nodeIds[i];
      const isConnected = edges.some(
        (edge) => edge.source === currentNodeId || edge.target === currentNodeId
      );
      if (!isConnected) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (nodes.length === 0) {
      setState((prev) => ({ ...prev, openPanel: false }));
    }
  }, [nodes.length]);

  useEffect(() => {
    // checking save condition
    const isConnected = validateConnectivity(nodes as unknown as Node[], edges);
    setAllNodesConnected(isConnected);
  }, [nodes, edges]);

  return (
    <FlowBuilderContainer>
      <ReactFlow
        nodes={nodes as unknown as Node[]}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        onPaneClick={onPaneClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Background />
      </ReactFlow>
      <SidePanel />
      <ConditionalWrapper showChild={nodes.length > 0}>
        <SettingsPanel nodeId={state.nodeId} setNodes={setNodes} />
      </ConditionalWrapper>
    </FlowBuilderContainer>
  );
};

export default Flow;
