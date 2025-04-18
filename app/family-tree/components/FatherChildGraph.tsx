import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";

const generateGraphFromNested = (
  data: any,
  startY = 0,
  spacingX = 200,
  spacingY = 120
) => {
  const nodes: any = [];
  const edges: any = [];
  let currentY = startY;

  const traverse = (person: any, parentId = null, level = 0) => {
    const nodeId = String(person.id);
    // Determine the x-position based on gender
    const x = level * spacingX + spacingX;
    const y = currentY;
    currentY += spacingY;

    nodes.push({
      id: nodeId,
      type: "custom",
      data: {
        label: person.name,
        age: person.age,
        phone: person.phone,
        gender: person.gender,
        children: person.children,
        fatherId: person.fatherId,
      },
      position: { x, y },
    });

    if (parentId) {
      edges.push({
        id: `e${parentId}-${nodeId}`,
        source: String(parentId),
        target: nodeId,
        type: "smoothstep",
        style: {
          stroke: person.gender === "Male" ? "#1E88E5" : "#D81B60",
          strokeWidth: 1.5,
        },
      });
    }

    person.children.forEach((child: any) => {
      traverse(child, person.id, level + 1);
    });
  };

  data.forEach((rootPerson: any) => {
    traverse(rootPerson);
  });

  return { nodes, edges };
};

const nodeTypes = {
  custom: CustomNode,
};

const FatherChildGraph = ({ data }: any) => {
  const { nodes, edges } = generateGraphFromNested(data);

  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="bg-[url('/bg.svg')] bg-no-repeat bg-center bg-cover"
    >
      <div className="bg-white/20 backdrop-blur-sm w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
        ></ReactFlow>
      </div>
    </div>
  );
};

export default FatherChildGraph;
