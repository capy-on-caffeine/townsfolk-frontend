'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ChartData {
  name: string;
  value: number;
}

interface LineChartData {
  x: string;
  y: number;
}

export function BarChart({ data, color = '#4f46e5', height = 300 }: { 
  data: ChartData[];
  color?: string;
  height?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Clear previous content
    svg.selectAll('*').remove();

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([chartHeight, margin.top]);

    const g = svg.append('g');

    // Add bars
    g.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.name) || 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => chartHeight - y(d.value))
      .attr('fill', color)
      .attr('rx', 4)
      .attr('ry', 4);

    // Add x-axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .style('fill', '#9ca3af');

    // Add y-axis
    g.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', '#9ca3af');

  }, [data, color, height]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={height}
      className="overflow-visible"
    />
  );
}

export function PieChart({ data, colors = ['#4f46e5', '#10b981', '#ef4444'], height = 300 }: {
  data: ChartData[];
  colors?: string[];
  height?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const radius = Math.min(width, height) / 2;

    // Clear previous content
    svg.selectAll('*').remove();

    const pie = d3.pie<ChartData>()
      .value(d => d.value);

    const arc = d3.arc<d3.PieArcDatum<ChartData>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.name))
      .range(colors);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Add slices
    g.selectAll('path')
      .data(pie(data))
      .join('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.name))
      .attr('stroke', '#1f2937')
      .style('stroke-width', '2px');

      // Add labels
    const labelArc = d3.arc<d3.PieArcDatum<ChartData>>()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.8);

    g.selectAll('text')
      .data(pie(data))
      .join('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => `${d.data.value}%`)
      .style('fill', '#ffffff')
      .style('font-size', '12px');

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width + 20}, 20)`);

    data.forEach((d, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`);

      legendItem.append('rect')
        .attr('width', 16)
        .attr('height', 16)
        .attr('fill', colorScale(d.name));

      legendItem.append('text')
        .attr('x', 24)
        .attr('y', 12)
        .text(`${d.name} (${d.value}%)`)
        .style('fill', '#9ca3af')
        .style('font-size', '12px');
    });

  }, [data, colors, height]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={height}
      className="overflow-visible"
    />
  );
}

export function LineChart({ data, color = '#4f46e5', height = 300 }: {
  data: LineChartData[];
  color?: string;
  height?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Clear previous content
    svg.selectAll('*').remove();

    const x = d3.scalePoint()
      .domain(data.map(d => d.x))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([
        Math.min(0, d3.min(data, d => d.y) || 0),
        Math.max(100, d3.max(data, d => d.y) || 0)
      ])
      .nice()
      .range([chartHeight, margin.top]);

    const line = d3.line<LineChartData>()
      .x(d => x(d.x) || 0)
      .y(d => y(d.y))
      .curve(d3.curveMonotoneX);

    const g = svg.append('g');

    // Add gradient
    const gradient = g.append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', y(0))
      .attr('x2', 0)
      .attr('y2', y(100));

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#ef4444');

    gradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#eab308');

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#22c55e');

    // Add line
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add dots
    g.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => x(d.x) || 0)
      .attr('cy', d => y(d.y))
      .attr('r', 4)
      .attr('fill', d => {
        if (d.y >= 75) return '#22c55e';
        if (d.y >= 50) return '#eab308';
        return '#ef4444';
      });

    // Add x-axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .style('fill', '#9ca3af');

    // Add y-axis
    g.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', '#9ca3af');

    // Add hover effects
    const tooltip = d3.select(svgRef.current!.parentElement!)
      .append('div')
      .attr('class', 'absolute hidden bg-gray-900 text-white px-2 py-1 rounded text-sm')
      .style('pointer-events', 'none');

    g.selectAll('circle')
      .on('mouseover', (event, d) => {
        const circle = d3.select(event.currentTarget);
        circle.attr('r', 6)
          .style('filter', 'brightness(1.2)');

        const datum = d as LineChartData;
        tooltip.style('display', 'block')
          .html(`${datum.x}: ${datum.y}%`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseout', event => {
        const circle = d3.select(event.currentTarget);
        circle.attr('r', 4)
          .style('filter', 'none');

        tooltip.style('display', 'none');
      });

  }, [data, color, height]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        className="overflow-visible"
      />
    </div>
  );
}