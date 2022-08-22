import { FC, useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import {
  CircularPackingData,
  CircularPackingElement,
  CircularPackingMainData,
  CircularPackingProps,
} from '@typings/charts';
import { faker } from '@faker-js/faker';

const CircularPacking: FC<CircularPackingProps> = ({
  width,
  height,
  data,
  size = 'xl',
}) => {
  const chartId = faker.random.alpha(10);
  const [chartType, setChartType] = useState<string>('all');
  const [chartData, setChartData] = useState<CircularPackingMainData>(data);

  useEffect(() => {
    if (!data) {
      return;
    }

    setChartData({
      ...data,
      children: data.children.filter((circle: CircularPackingElement) =>
        chartType && chartType !== 'all' ? circle.type === chartType : true
      ),
    });
  }, [chartType, data]);

  const hierarchy = useMemo(() => {
    return d3
      .hierarchy(chartData)
      .sum((d) => d.value)
      .sort((a, b) => {
        if (a?.value && b?.value) {
          return b?.value - a?.value;
        } else {
          return 0;
        }
      });
  }, [chartData]);

  const root = useMemo(() => {
    const packGenerator = d3
      .pack<CircularPackingData>()
      .size([width, height])
      .padding(2);
    return packGenerator(hierarchy);
  }, [hierarchy, width, height]);

  useEffect(() => {
    const previous = d3.select('#' + chartId).selectChild('svg');
    console.log(previous);
    if (previous) {
      previous.remove();
    }
    const svg = d3.select('#' + chartId).append('svg');

    svg
      .attr('id', 'circularPackingChart')
      .attr('width', width)
      .attr('height', height)
      .attr('display', 'inline-block');

    const node = svg.selectAll('g').data(root.descendants().slice(1)).join('g');
    //.attr('transform', d => `translate(${d.x},${d.y})`)

    const circle = node
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
      .attr('key', (node) => node.data.id)
      .attr('x', (node) => node.x - node.r + 5)
      .attr('y', (node) => node.y)
      .attr('fontSize', 13)
      .attr('fontWeight', 0.4)
      .attr('textAnchor', 'middle')
      .style('display', (node) => (node.r < 25 ? 'none' : 'block'))
      //.attr('alignmentBaseline', 'middle')
      .attr('lengthAdjust', 'spacingAndGlyphs')
      .attr('textLength', (node) => node.r * 2 - 10)
      .text((node) => node.data.type);
    node
      .append('text')
      .style('display', (node) =>
        node.data.name.length > 5 && node.r < 25 ? 'none' : 'block'
      )
      .attr('key', (node) => node.data.id)
      .attr('x', (node) => node.x - node.r + 10)
      .attr('y', (node) => node.y + 15)
      .attr('fontSize', 10)
      .attr('fontWeight', 0.4)
      .attr('textAnchor', 'middle')
      //.attr('alignmentBaseline', 'middle')
      .attr('lengthAdjust', 'spacing')
      .attr('textLength', (node) => node.r * 2 - 20);
    //.text((node) => node.data.name + (node.r - node.data.name.length));

    circle.on('click', (event, d) => {
      setChartType(d.data.type);
      console.log(d.data.type);
      //t.key = event.target.attributes.key.value)
      // const currentCircle = event.target as SVGCircleElement;

      d3.select('text')
        .transition()
        .duration(1000)
        .attr('r', d.r * 2);
    });
  }, [chartId, data, height, root, width]);

  // const checkTextellipsis = (text: string, threshold: number): string => {
  //     //select(cont).node().getComputedTextLength()

  //     console.log(text, text.length, threshold)
  //     return text.length < threshold ? text : text.substr(0, threshold).concat('...');
  // }

  return (
    <Container className={`chart__container chart__container--${size}`}>
      {chartData && (
        <Row className='justify-content-center'>
          <Col xs={12}>
            <Nav
              activeKey={chartType}
              onSelect={(selectedKey) =>
                selectedKey && setChartType(selectedKey)
              }
            >
              {chartData?.groups.map((group) => (
                <Nav.Item key={group}>
                  <Nav.Link eventKey={group} disabled={group === chartType}>
                    {group}
                  </Nav.Link>
                </Nav.Item>
              ))}
              <Nav.Item>
                <Nav.Link eventKey={'all'} disabled={'all' === chartType}>
                  All groups
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      )}
      <Row className='justify-content-center'>
        <Col xs={'auto'}>
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
