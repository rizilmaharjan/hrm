import React, { useEffect, useState } from "react";
import { Instance } from "../utils/Instance";
import Loader from "../components/Loader";
import { FileExport } from "../assets/svg";

export type TPosition = {
  position_cd: string;
  position_desc: string;
  position_desc_nep?: string;
  upper_position_cd?: string;
  group_flag: string;
  disabled: string;
  entered_by: string;
  order_no: number;
  computer_position_cd?: string;
  new_position_cd?: string;
  children?: TPosition[];
};

const Position: React.FC = () => {
  const [treeData, setTreeData] = useState<TPosition[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        setIsLoading(true);
        const res = await Instance("/v1/position");
        const data = res.data.data;
        const tree = buildTree(data);
        setTreeData(tree);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tree data:", error);
      }
    };

    fetchTreeData();
  }, []);

  const buildTree = (data: TPosition[]): TPosition[] => {
    const tree: TPosition[] = [];
    const map: { [key: string]: TPosition } = {};

    data.forEach((item) => {
      map[item.position_cd] = { ...item, children: [] };
    });

    data.forEach((item) => {
      if (item.upper_position_cd !== undefined) {
        const parentNode = map[item.upper_position_cd];
        if (parentNode) {
          parentNode.children?.push(map[item.position_cd]);
        } else {
          tree.push(map[item.position_cd]);
        }
      }
    });

    return tree;
  };

  const toggleNode = (position_cd: string) => {
    setExpandedNodes((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(position_cd)) {
        newExpanded.delete(position_cd);
      } else {
        newExpanded.add(position_cd);
      }
      return newExpanded;
    });
  };

  const renderTree = (nodes: TPosition[], level: number = 0) => (
    <ul>
      {nodes.map((node) => (
        <li key={node.position_cd} style={{ paddingLeft: `${level * 20}px` }}>
          {node.children && node.children.length > 0 && (
            <button
              onClick={() => toggleNode(node.position_cd)}
              style={{ marginRight: "5px" }}
            >
              {expandedNodes.has(node.position_cd) ? "-" : "+"}
            </button>
          )}
          <span>{node.position_desc}</span>
          {expandedNodes.has(node.position_cd) &&
            node.children &&
            node.children.length > 0 && (
              <ul>{renderTree(node.children, level + 1)}</ul>
            )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative top-0 bottom-0 h-full sm:rounded-lg w-full">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center w-full">
          <Loader color="text-blue-800" width="w-6" height="h-6" />
        </div>
      ) : (
        <>
          <div className="flex justify-between p-3">
            <h1 className="font-semibold text-xl">Position</h1>

            <button
              //   onClick={exportToPDF}
              className="bg-green-500 text-white py-1 px-2 rounded-lg font-semibold"
              type="button"
            >
              <FileExport />
            </button>
          </div>
          {/* <div className="h-full w-full bg-red-700"> */}
          <div className="w-full flex justify-around">
            <div className="p-4 w-1/2 h-[40rem] shadow-md overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100">
              {renderTree(treeData)}
            </div>
            <div className="w-1/2 shadow-md p-4">
              <h3 className="text-lg font-bold">Add Position</h3>
              <form>
                <div className="grid grid-cols-4 gap-4">
                  <div className="relative z-0 w-full mb-5 col-start-1">
                    <label
                      htmlFor="position-cd"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Code
                    </label>
                    <input
                      id="position_cd"
                      name="position_cd"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Code"
                      required
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5 col-start-2 col-span-4">
                    <label
                      htmlFor="position-desc"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <input
                      id="position_desc"
                      name="position_desc"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Code"
                      required
                    />
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5">
                  <label htmlFor="position_desc_nep" className="block"></label>
                </div>
              </form>
            </div>
          </div>
          {/* </div> */}
        </>
      )}
    </div>
  );
};

export default Position;
