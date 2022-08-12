import { FC, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CircularPackingData, CircularPackingProps } from '@typings/charts';
import { faker } from '@faker-js/faker';

const CircularPacking: FC<CircularPackingProps> = ({ width, height, data }) => {
  const chartId = faker.random.alpha(10);

  const hierarchy = useMemo(() => {
    return d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value! - a.value!);
  }, [data]);

  const root = useMemo(() => {
    const packGenerator = d3
      .pack<CircularPackingData>()
      .size([width, height])
      .padding(2);
    return packGenerator(hierarchy);
  }, [hierarchy, width, height]);

  useEffect(() => {
    const previous = d3.select('#second');
    if (previous) {
      previous.remove();
    }
    const svg = d3.select('#' + chartId).append('svg');

    svg
      .attr('id', 'second')
      .attr('width', width)
      .attr('height', height)
      .attr('display', 'inline-block');

    const node = svg.selectAll('g').data(root.descendants().slice(1)).join('g');
    //.attr('transform', d => `translate(${d.x},${d.y})`)

    node
      .append('circle')
      .attr('r', (node) => node.r)
      .attr('cx', (node) => node.x)
      .attr('cy', (node) => node.y)
      .attr('key', (node) => node.data.id)
      .attr('stroke-width', (node) => 1 / (node.depth + 1))
      .attr('fill', (node) => data.groupsColors[node.data.type])
      .attr('fillOpacity', 0.2);

    node
      .append('text')
      .attr('className', (node) => (node.r < 20 ? 'd-none' : ''))
      .attr('key', (node) => node.data.id)
      .attr('x', (node) => node.x - node.r)
      .attr('y', (node) => node.y)
      .attr('fontSize', 12)
      .attr('fontWeight', 0.2)
      .attr('textAnchor', 'start')
      .attr('alignmentBaseline', 'central')
      .attr('lengthAdjust', 'spacingAndGlyphs')
      .attr('textLength', (node) => node.r * 2)
      .text((node) => node.data.name);

    // circle.on('click', (d: d3.HierarchyCircularNode<CircularPackingData>) => {
    //     svg
    //         .transition()
    //         .duration(1000)
    //         .attr('viewBox', [
    //             d.x - d.r,
    //             d.y - d.r,
    //             d.r * 2 ,
    //             d.r * 2
    //         ]);
    // });
  }, [chartId, data, height, root, width]);

  // const checkTextellipsis = (text: string, threshold: number): string => {
  //     //select(cont).node().getComputedTextLength()

  //     console.log(text, text.length, threshold)
  //     return text.length < threshold ? text : text.substr(0, threshold).concat('...');
  // }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col>
          <div id={chartId}></div>
        </Col>
      </Row>
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
                  key={node.data.id}
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  stroke={data.groupsColors[node.data.type]}
                  strokeWidth={2}
                  fill={data.groupsColors[node.data.type]}
                  fillOpacity={0.2}
                />
              ))}
            {root
              .descendants()
              .slice(1)
              .map((node) => {
                return (
                  <text
                    className={node.r < 20 ? 'd-none' : ''}
                    key={node.data.id}
                    x={node.x}
                    y={node.y}
                    fontSize={13}
                    fontWeight={0.4}
                    textAnchor='middle'
                    alignmentBaseline='middle'
                    lengthAdjust='spacingAndGlyphs'
                    textLength={node.r * 2}
                  >
                    <tspan x={node.x} dy='0'>
                      {node.data.type}
                    </tspan>
                    <tspan x={node.x} dy='1em'>
                      {node.data.name}
                    </tspan>
                  </text>
                );
              })}
          </svg>
        </Col>
      </Row>
    </Container>
  );
};
export default CircularPacking;
