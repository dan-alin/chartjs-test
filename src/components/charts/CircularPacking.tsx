import { FC, useMemo } from 'react';
import * as d3 from 'd3';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { faker } from '@faker-js/faker';

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
export type TreeFruit = {
  type: 'fruit';
  name: string;
  value: number;
};

export type Tree = TreeNode | TreeLeaf | TreeFruit;
type CircularPackingProps = {
  width: number;
  height: number;
  data: Tree;
};

const CircularPacking: FC<CircularPackingProps> = ({ width, height, data }) => {
  // const svg = d3.select("body").append("svg")
  //     .attr("width", width)
  //     .attr("height", height);

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

  const colors = {
    node: faker.color.rgb(),
    fruit: faker.color.rgb(),
    leaf: faker.color.rgb(),
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col>
          <svg
            width={width}
            height={height}
            style={{ display: 'inline-block' }}
          >
            {root
              .descendants()
              .slice(1)
              .map((node) => (
                <circle
                  key={node.data.name}
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  stroke={colors[node.data.type]}
                  strokeWidth={2}
                  fill={colors[node.data.type]}
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
        </Col>
      </Row>
    </Container>
  );
};
export default CircularPacking;
