import { useMemo } from 'react';
import * as d3 from 'd3';
import React from 'react';

export type TreeNode = {
  type: 'node';
  value: number;
  name: string;
  children: Tree[];
};
export type TreeLeaf = {
  type: 'leaf';
  name: string;
  value: number;
};

export type Tree = TreeNode | TreeLeaf;

export const data: Tree = {
  type: 'node',
  name: 'boss',
  value: 2300,
  children: [
    { type: 'leaf', name: 'Mark', value: 90 },
    { type: 'leaf', name: 'Robert', value: 12 },
    { type: 'leaf', name: 'Emily', value: 34 },
    { type: 'leaf', name: 'Marion', value: 53 },
    { type: 'leaf', name: 'Nicolas', value: 98 },
    { type: 'leaf', name: 'Malki', value: 22 },
    { type: 'leaf', name: 'Djé', value: 12 },
    { type: 'leaf', name: 'Mélanie', value: 45 },
    { type: 'leaf', name: 'Einstein', value: 76 },
  ],
};

type CircularPackingProps = {
  width: number;
  height: number;
  data: Tree;
};

export const CircularPacking = ({
  width,
  height,
  data,
}: CircularPackingProps) => {
  const hierarchy = useMemo(() => {
    return d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value! - a.value!);
  }, [data]);

  const root = useMemo(() => {
    const packGenerator = d3.pack<Tree>().size([width, height]).padding(4);
    return packGenerator(hierarchy);
  }, [hierarchy, width, height]);

  return (
    <svg width={width} height={height} style={{ display: 'inline-block' }}>
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <circle
            key={node.data.name}
            cx={node.x}
            cy={node.y}
            r={node.r}
            stroke='#553C9A'
            strokeWidth={2}
            fill='#B794F4'
            fillOpacity={0.2}
          />
        ))}
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <text
            key={node.data.name}
            x={node.x}
            y={node.y}
            fontSize={13}
            fontWeight={0.4}
            textAnchor='middle'
            alignmentBaseline='middle'
          >
            {node.data.name}
          </text>
        ))}
    </svg>
  );
};