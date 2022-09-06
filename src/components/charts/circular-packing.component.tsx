import { FC, useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
import React from 'react';
import {
  Col,
  Container,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
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
    if (previous) {
      previous.remove();
    }
    const svg = d3
      .select('#' + chartId)
      .append('svg')
      .attr('id', 'circularPackingChart')
      .attr('width', width)
      .attr('height', height)
      .attr('display', 'inline-block');

    const nodeData: d3.HierarchyCircularNode<CircularPackingData>[] = root
      .descendants()
      .slice(1);
    const mainElement = svg
      .append('g')
      .selectAll('circle')
      .data(nodeData)
      .enter();

    const node = mainElement
      .append('circle')
      .attr('r', (node) => node.r)
      .attr('cx', (node) => node.x)
      .attr('cy', (node) => node.y)
      .attr('key', (node) => node.data.id)
      .attr('stroke-width', 1)
      .attr('fill', (node) => data.groupsColors[node.data.type])
      .attr('fillOpacity', 0.2)
      .on('click', (event, d) => {
        setChartType(d.data.type);
        //t.key = event.target.attributes.key.value)
        // const currentCircle = event.target as SVGCircleElement;
      });

    // circle.transition()
    //   .duration(faker.datatype.number({ min: 500, max: 3000 }))
    //   .attr("r", (node) => node.r);

    const text = mainElement
      .append('text')
      .attr('key', (node) => node.data.id)
      .attr('x', (node) => node.x)
      .attr('y', (node) => node.y)
      .attr('font-size', 13)
      .attr('font-weight', 0.4)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('lengthAdjust', 'spacingAndGlyphs')
      .attr('fill', '#ffffff')
      //.style('display', (node) => (node.r < 25 ? 'none' : 'block'))
      .attr('textLength', (node) => node.r * 2);

    text
      .append('tspan')
      .attr('class', 'first')
      .style('display', (node) =>
        node.data.name.length > 5 && node.r < 30 ? 'none' : 'block'
      )
      .attr('x', (node) => node.x)
      .attr('dy', '0')
      .text((node) => node.data.type);

    text
      .append('tspan')
      .style('display', (node) =>
        node.data.name.length > 5 && node.r < 30 ? 'none' : 'block'
      )
      .attr('class', 'second')
      .attr('x', (node) => node.x)
      .attr('dy', '1em')
      .attr('fontSize', 10)
      .attr('fontWeight', 0.4)
      .text((node) => node.data.name);

    const simulation = d3
      .forceSimulation(nodeData)
      .force(
        'center', // Attraction to the center of the svg area
        d3
          .forceCenter()
          .x(width * 0.5)
          .y(height * 0.5)
      )
      .force(
        'charge', // Nodes are attracted one each other of value is > 0
        d3.forceManyBody().strength(-15)
      )
      .force(
        'forceX',
        d3
          .forceX()
          .strength(0.1)
          .x(width * 0.5)
      )
      .force(
        'forceY',
        d3
          .forceY()
          .strength(0.1)
          .y(height * 0.5)
      );

    // export interface simNode extends SimulationNodeDatum extends (d3.HierarchyCircularNode<CircularPackingData>);
    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop
    simulation
      .nodes(nodeData)
      .force(
        'collide', // Force that avoids circle overlapping
        d3
          .forceCollide()
          .strength(0.5)
          .radius(
            (d) => (d as d3.HierarchyCircularNode<CircularPackingData>).r + 1
          )
          .iterations(1)
      )
      .on('tick', () => {
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
        text
          .attr('x', (d) => d.x)
          .attr('dy', () => '0')
          .selectChildren('tspan')
          .attr(
            'x',
            (d) => (d as d3.HierarchyCircularNode<CircularPackingData>).x
          )
          .attr(
            'y',
            (d) => (d as d3.HierarchyCircularNode<CircularPackingData>).y
          )
          .selectAll('.first')
          .attr('dy', () => '0')
          .selectAll('.second')
          .attr('dy', () => '1em');
      });

    node.selectAll('circle').on('mouseover', (event) => {
      console.log(event.target);
      d3.select(event.target as SVGCircleElement)
        .transition()
        .duration(1000)
        .attr('r', () => 10);
    });
  }, [chartId, data, height, root, width]);

  // const checkTextellipsis = (text: string, threshold: number): string => {
  //     console.log(text, text.length, threshold)
  //     return text.length < threshold ? text : text.substr(0, threshold).concat('...');
  // }

  return (
    <Container className={`chart__container chart__container--${size}`}>
      {chartData && (
        <Row className='justify-content-center mb-4'>
          <Col>
            <ToggleButtonGroup
              value={chartType}
              defaultValue='all'
              name='types'
              type='radio'
              className='justify-content-center'
              onChange={(val) => {
                return setChartType(val);
              }}
            >
              {chartData?.groups.map((group) => {
                const selected = chartType === group;
                return (
                  <ToggleButton
                    style={{
                      backgroundColor: selected
                        ? chartData.groupsColors[group]
                        : '#fff',
                      color: selected ? '#fff' : chartData.groupsColors[group],
                    }}
                    name={group}
                    value={group}
                    checked={selected}
                    key={group}
                    id={group}
                  >
                    {group}
                  </ToggleButton>
                );
              })}
              <ToggleButton
                value={'all'}
                name='all'
                id='all'
                checked={chartType === 'all'}
                variant='secondary'
                key={'all'}
                onClick={() => setChartType('all')}
                disabled={'all' === chartType}
              >
                All groups
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      )}
      <Row className='justify-content-center'>
        <Col xs={'auto'}>
          <div id={chartId}></div>
        </Col>
      </Row>
      <Row className='justify-content-center d-none'>
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
                  fillOpacity={1}
                />
              ))}
            {root
              .descendants()
              .slice(1)
              .map((node) => {
                return (
                  <text
                    className={node.r < 30 ? 'd-none' : ''}
                    key={node.data.id}
                    x={node.x}
                    y={node.y}
                    fontSize={13}
                    fontWeight={0.4}
                    textAnchor='middle'
                    alignmentBaseline='middle'
                    lengthAdjust='spacingAndGlyphs'
                    textLength={node.r * 2}
                    fill={'#ffffff'}
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
