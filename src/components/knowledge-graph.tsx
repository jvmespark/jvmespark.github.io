'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

type Node = {
  id: string;
  label: string;
  kind: 'post' | 'tag';
  url: string;
  weight?: number;
} & d3.SimulationNodeDatum;

type Link = { source: string | Node; target: string | Node };

export type GraphData = {
  nodes: { id: string; label: string; kind: 'post' | 'tag'; url: string; weight?: number }[];
  links: { source: string; target: string }[];
};

export function KnowledgeGraph({ data }: { data: GraphData }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<Node | null>(null);

  useEffect(() => {
    if (!svgRef.current || !wrapRef.current) return;

    const wrap = wrapRef.current;
    const w = wrap.clientWidth;
    const h = Math.max(440, Math.min(640, w * 0.7));

    const svg = d3.select(svgRef.current).attr('viewBox', `0 0 ${w} ${h}`);
    svg.selectAll('*').remove();

    const g = svg.append('g');

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on('zoom', (event) => g.attr('transform', event.transform.toString()));
    svg.call(zoom);

    const nodes: Node[] = data.nodes.map((n) => ({ ...n }));
    const links: Link[] = data.links.map((l) => ({ ...l }));

    const sim = d3
      .forceSimulation<Node>(nodes)
      .force(
        'link',
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance((l) => {
            const s = l.source as Node;
            const t = l.target as Node;
            return s.kind === 'tag' || t.kind === 'tag' ? 70 : 110;
          })
          .strength(0.4),
      )
      .force('charge', d3.forceManyBody().strength(-220))
      .force('center', d3.forceCenter(w / 2, h / 2))
      .force(
        'collision',
        d3.forceCollide<Node>().radius((d) => (d.kind === 'tag' ? 22 : 14)),
      );

    const link = g
      .append('g')
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.18)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 0.8);

    const node = g
      .append('g')
      .selectAll<SVGGElement, Node>('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .on('mouseenter', (_, d) => setHover(d))
      .on('mouseleave', () => setHover(null))
      .on('click', (_, d) => {
        if (d.url) window.location.href = d.url;
      })
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on('start', (event, d) => {
            if (!event.active) sim.alphaTarget(0.3).restart();
            d.fx = d.x ?? null;
            d.fy = d.y ?? null;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) sim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      );

    // post nodes — small circle
    node
      .filter((d) => d.kind === 'post')
      .append('circle')
      .attr('r', 6)
      .attr('fill', 'hsl(var(--accent))')
      .attr('stroke', 'hsl(var(--paper))')
      .attr('stroke-width', 1.5);

    // tag nodes — larger soft pill background
    const tagSel = node.filter((d) => d.kind === 'tag');
    tagSel
      .append('rect')
      .attr('rx', 12)
      .attr('ry', 12)
      .attr('fill', 'hsl(var(--paper-deep))')
      .attr('stroke', 'hsl(var(--paper-line))')
      .attr('stroke-width', 0.8);
    tagSel
      .append('text')
      .text((d) => d.label)
      .attr('x', 0)
      .attr('y', 4)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .style('font-family', 'var(--font-mono)')
      .style('font-size', '10px');
    // size rect to text
    tagSel.each(function () {
      const text = d3.select(this).select('text').node() as SVGTextElement | null;
      if (!text) return;
      const bbox = text.getBBox();
      const padX = 10;
      const padY = 4;
      d3.select(this)
        .select('rect')
        .attr('x', bbox.x - padX)
        .attr('y', bbox.y - padY)
        .attr('width', bbox.width + padX * 2)
        .attr('height', bbox.height + padY * 2);
    });

    // label for post nodes
    node
      .filter((d) => d.kind === 'post')
      .append('text')
      .text((d) => d.label)
      .attr('x', 9)
      .attr('y', 3)
      .attr('fill', 'hsl(var(--ink-muted))')
      .style('font-family', 'var(--font-sans)')
      .style('font-size', '11px')
      .style('pointer-events', 'none');

    sim.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as Node).x ?? 0)
        .attr('y1', (d) => (d.source as Node).y ?? 0)
        .attr('x2', (d) => (d.target as Node).x ?? 0)
        .attr('y2', (d) => (d.target as Node).y ?? 0);
      node.attr('transform', (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
    });

    // resize handler
    const ro = new ResizeObserver(() => {
      const nw = wrap.clientWidth;
      const nh = Math.max(440, Math.min(640, nw * 0.7));
      svg.attr('viewBox', `0 0 ${nw} ${nh}`);
      sim.force('center', d3.forceCenter(nw / 2, nh / 2));
      sim.alpha(0.3).restart();
    });
    ro.observe(wrap);

    return () => {
      ro.disconnect();
      sim.stop();
    };
  }, [data]);

  return (
    <div ref={wrapRef} className="relative w-full">
      <svg
        ref={svgRef}
        role="img"
        aria-label="Knowledge graph of posts and tags"
        className="w-full text-ink"
      />
      <div
        className="pointer-events-none absolute left-3 top-3 rounded-md border border-paper-line bg-paper/85 px-2.5 py-1.5 font-mono text-[11px] text-ink-muted backdrop-blur"
        aria-hidden
      >
        drag · scroll · click
      </div>
      {hover && (
        <div
          className="pointer-events-none absolute right-3 top-3 max-w-[60%] rounded-md border border-paper-line bg-paper/95 px-3 py-1.5 text-[12.5px] text-ink shadow-soft backdrop-blur"
          aria-live="polite"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            {hover.kind}
          </span>
          <div className="font-display">{hover.label}</div>
        </div>
      )}
    </div>
  );
}
