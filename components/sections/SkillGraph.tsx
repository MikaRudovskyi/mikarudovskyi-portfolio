"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { techStack, designTools } from "@/data/techstack";

const SIGNAL = "#45d6c2";
const MAGENTA = "#ff2e7a";
const MUTED2 = "#576270";
const BORDER = "#212a32";
const SURFACE = "#10151a";
const SURFACE2 = "#161c22";
const TEXT = "#e7eaee";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#45d6c2",
  Backend: "#ff2e7a",
  Databases: "#e8a548",
  "Tools & DevOps": "#8b96a3",
  "Telecom & APIs": "#a78bfa",
  "Design": "#576270",
};

type NodeType = "center" | "category" | "skill";

interface Node {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  categoryId?: string;
  targetX: number;
  targetY: number;
  targetAngle?: number;
  angleRange?: number;
}

interface Edge {
  from: string;
  to: string;
  color: string;
}

function buildGraph(cx: number, cy: number, isMobile: boolean) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const catDist = isMobile ? 110 : 155;
  const skillDist = isMobile ? 195 : 270;

  nodes.push({
    id: "center", label: "M.Rudovskyi", type: "center",
    x: cx, y: cy, vx: 0, vy: 0,
    radius: isMobile ? 30 : 40,
    color: SIGNAL,
    targetX: cx, targetY: cy,
  });

  const allCategories = [...techStack, designTools];
  const catCount = allCategories.length;

  allCategories.forEach((cat, ci) => {
    const angle = (ci / catCount) * Math.PI * 2 - Math.PI / 2;
    const color = CATEGORY_COLORS[cat.title] ?? SIGNAL;
    const catId = `cat_${ci}`;
    const tx = cx + Math.cos(angle) * catDist;
    const ty = cy + Math.sin(angle) * catDist;

    nodes.push({
      id: catId, label: cat.title, type: "category",
      x: tx, y: ty, vx: 0, vy: 0,
      radius: isMobile ? 22 : 30,
      color, targetX: tx, targetY: ty,
    });

    edges.push({ from: "center", to: catId, color });

    cat.items.forEach((item, si) => {
      const spread = Math.min(
        Math.PI * 0.55,
        (cat.items.length / 8) * Math.PI * 0.6
      );
      const startAngle = angle - spread / 2;
      const step = cat.items.length > 1 ? spread / (cat.items.length - 1) : 0;
      const sa = startAngle + si * step;
      const sd = skillDist + (si % 2) * (isMobile ? 18 : 22);
      const skillId = `skill_${ci}_${si}`;
      const tx2 = cx + Math.cos(sa) * sd;
      const ty2 = cy + Math.sin(sa) * sd;

      nodes.push({
        id: skillId, label: item, type: "skill",
        x: tx2, y: ty2, vx: 0, vy: 0,
        radius: isMobile ? 14 : 18,
        color, categoryId: catId,
        targetX: tx2, targetY: ty2,
        targetAngle: sa,
        angleRange: spread / 2 + 0.08,
      });

      edges.push({ from: catId, to: skillId, color });
    });
  });

  return { nodes, edges };
}

function TechBadge({ item, color }: { item: string; color: string }) {
  const [scanned, setScanned] = useState(false);

  return (
    <motion.span
      onMouseEnter={() => setScanned(true)}
      onMouseLeave={() => setScanned(false)}
      onTouchStart={() => setScanned(true)}
      onTouchEnd={() => setTimeout(() => setScanned(false), 600)}
      animate={scanned ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.25 }}
      className="relative rounded border px-2.5 py-1 text-xs font-mono cursor-default select-none transition-colors duration-150"
      style={
        scanned
          ? {
              borderColor: color + "80",
              background: color + "18",
              color,
              textShadow: `0 0 8px ${color}`,
              boxShadow: `0 0 10px 1px ${color}40`,
            }
          : { borderColor: BORDER, background: SURFACE2, color: MUTED2 }
      }
    >
      {scanned && (
        <motion.span
          className="pointer-events-none absolute inset-x-0 h-px"
          style={{ background: color }}
          initial={{ scaleX: 0, opacity: 0.8, top: "0%" }}
          animate={{
            scaleX: [0, 1, 1, 0],
            opacity: [0.8, 1, 1, 0],
            top: ["0%", "0%", "100%", "100%"],
          }}
          transition={{ duration: 0.4, ease: "linear" }}
        />
      )}
      {item}
    </motion.span>
  );
}

function MobileSkillList() {
  const allCategories = [...techStack, designTools];
  return (
    <div className="space-y-4">
      {allCategories.map((cat, i) => {
        const color = CATEGORY_COLORS[cat.title] ?? SIGNAL;
        return (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`rounded-lg border bg-surface p-4 ${
              cat.title === designTools.title
                ? "border-dashed border-border"
                : "border-border"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: color, boxShadow: `0 0 5px ${color}` }}
              />
              <p className="font-mono text-xs tracking-wider" style={{ color }}>
                {cat.title.toUpperCase()}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <TechBadge key={item} item={item} color={color} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function SkillGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const s = useRef({
    nodes: [] as Node[],
    edges: [] as Edge[],
    hoveredId: null as string | null,
    dragId: null as string | null,
    dragOffX: 0,
    dragOffY: 0,
    pulse: 0,
    ready: false,
    hoverProgress: {} as Record<string, number>,
  });
  const rafRef = useRef<number | null>(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const w = container.offsetWidth;
    const h = Math.max(560, w * 0.6);
    canvas.width = w;
    canvas.height = h;
    const { nodes, edges } = buildGraph(w / 2, h / 2, false);
    s.current.nodes = nodes;
    s.current.edges = edges;
    s.current.hoverProgress = {};
    s.current.ready = true;
  }, []);

  useEffect(() => {
    init();
    const ro = new ResizeObserver(init);
    if (containerRef.current) ro.observe(containerRef.current);
    const canvas = canvasRef.current;
    if (!canvas) return;

    function getPos(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function hitNode(x: number, y: number): Node | null {
      for (let i = s.current.nodes.length - 1; i >= 0; i--) {
        const n = s.current.nodes[i];
        const dx = x - n.x, dy = y - n.y;
        const hitR = n.type === "skill"
          ? Math.max(n.radius + 10, 22)
          : n.radius + 6;
        if (Math.sqrt(dx * dx + dy * dy) <= hitR) return n;
      }
      return null;
    }

    function onMouseMove(e: MouseEvent) {
      const { x, y } = getPos(e);
      if (s.current.dragId) {
        const node = s.current.nodes.find(n => n.id === s.current.dragId);
        if (node) {
          node.x = x + s.current.dragOffX;
          node.y = y + s.current.dragOffY;
          node.vx = 0; node.vy = 0;
        }
        return;
      }
      const hit = hitNode(x, y);
      s.current.hoveredId = hit?.id ?? null;
      canvas!.style.cursor = s.current.hoveredId ? "grab" : "default";
    }

    function onMouseDown(e: MouseEvent) {
      const { x, y } = getPos(e);
      const hit = hitNode(x, y);
      if (hit && hit.id !== "center") {
        s.current.dragId = hit.id;
        s.current.dragOffX = hit.x - x;
        s.current.dragOffY = hit.y - y;
        canvas!.style.cursor = "grabbing";
      }
    }

    function onMouseUp() {
      s.current.dragId = null;
      canvas!.style.cursor = s.current.hoveredId ? "grab" : "default";
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", () => {
      s.current.hoveredId = null;
      s.current.dragId = null;
    });

    function hexToRgb(hex: string) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    }

    function lerpColor(a: string, b: string, t: number): string {
      const ar = parseInt(a.slice(1, 3), 16);
      const ag = parseInt(a.slice(3, 5), 16);
      const ab = parseInt(a.slice(5, 7), 16);
      const br = parseInt(b.slice(1, 3), 16);
      const bg = parseInt(b.slice(3, 5), 16);
      const bb = parseInt(b.slice(5, 7), 16);
      return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`;
    }

    function drawHudCorners(
      ctx: CanvasRenderingContext2D,
      x: number, y: number, r: number,
      color: string, alpha: number
    ) {
      const cs = r + 7, cl = 8;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = alpha;
      ([[-1, -1], [1, -1], [1, 1], [-1, 1]] as [number, number][]).forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(x + sx * cs, y + sy * (cs - cl));
        ctx.lineTo(x + sx * cs, y + sy * cs);
        ctx.lineTo(x + sx * (cs - cl), y + sy * cs);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }

    function drawRoundRect(
      ctx: CanvasRenderingContext2D,
      x: number, y: number, w: number, h: number, r: number
    ) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }

    function simulate() {
      const { nodes, edges, dragId, hoveredId, hoverProgress } = s.current;
      const center = nodes.find(n => n.id === "center");

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.id === "center" || n.id === dragId) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          if (m.id === "center") continue;
          const dx = n.x - m.x, dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minD = n.radius + m.radius +
            (n.type === "skill" && m.type === "skill" ? 32 : 18);
          if (dist < minD) {
            const f = (minD - dist) / dist * 0.15;
            n.vx += dx * f; n.vy += dy * f;
            m.vx -= dx * f; m.vy -= dy * f;
          }
        }

        const edge = edges.find(e => e.to === n.id);
        if (edge) {
          const parent = nodes.find(p => p.id === edge.from);
          if (parent) {
            const dx = parent.x - n.x, dy = parent.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const target = n.type === "skill" ? 140 : 155;
            const diff = dist - target;
            const f = diff * 0.018;
            n.vx += (dx / dist) * f;
            n.vy += (dy / dist) * f;
          }
        }

        if (n.type === "skill" && center && n.targetAngle !== undefined && n.angleRange !== undefined) {
          const dx = n.x - center.x;
          const dy = n.y - center.y;
          const currentAngle = Math.atan2(dy, dx);
          let angleDiff = currentAngle - n.targetAngle;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          if (Math.abs(angleDiff) > n.angleRange) {
            const clampedAngle = n.targetAngle + Math.sign(angleDiff) * n.angleRange;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const targetX = center.x + Math.cos(clampedAngle) * dist;
            const targetY = center.y + Math.sin(clampedAngle) * dist;
            n.vx += (targetX - n.x) * 0.06;
            n.vy += (targetY - n.y) * 0.06;
          }
        }

        n.vx *= 0.78; n.vy *= 0.78;
        n.x += n.vx; n.y += n.vy;
      }

      const hovered = hoveredId ? nodes.find(n => n.id === hoveredId) : null;
      const activeCategory =
        hovered?.type === "skill" ? hovered.categoryId :
        hovered?.type === "category" ? hovered.id : null;

      for (const node of nodes) {
        const isInChain = activeCategory && (
          node.id === activeCategory ||
          node.categoryId === activeCategory ||
          node.id === "center"
        );
        const shouldHighlight = !!isInChain || node.id === hoveredId;
        const current = hoverProgress[node.id] ?? 0;
        hoverProgress[node.id] = shouldHighlight
          ? Math.min(current + 0.08, 1)
          : Math.max(current - 0.08, 0);
      }
    }

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas || !s.current.ready) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      s.current.pulse = (s.current.pulse + 0.035) % (Math.PI * 2);
      const { nodes, edges, hoveredId, pulse, hoverProgress } = s.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const hovered = hoveredId ? nodes.find(n => n.id === hoveredId) : null;
      const activeCategory =
        hovered?.type === "skill" ? hovered.categoryId :
        hovered?.type === "category" ? hovered.id : null;

      const maxHp = Math.max(0, ...Object.values(hoverProgress));

      for (const edge of edges) {
        const from = nodes.find(n => n.id === edge.from);
        const to = nodes.find(n => n.id === edge.to);
        if (!from || !to) continue;

        const isActive = activeCategory && (
          edge.from === activeCategory ||
          edge.to === activeCategory ||
          (edge.from === "center" && edge.to === activeCategory)
        );
        const dimmed = activeCategory && !isActive;

        if (dimmed) {
          ctx.globalAlpha = Math.max(0.5 - maxHp * 0.42, 0.08);
          ctx.strokeStyle = BORDER;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
          continue;
        }

        const edgeHp = Math.max(
          hoverProgress[edge.from] ?? 0,
          hoverProgress[edge.to] ?? 0
        );

        if (isActive) {
          ctx.shadowColor = edge.color;
          ctx.shadowBlur = edgeHp * 8;
          ctx.strokeStyle = edge.color;
          ctx.lineWidth = 0.8 + edgeHp * 0.8;
          ctx.globalAlpha = 0.15 + edgeHp * 0.55;
        } else {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = BORDER;
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = 0.5;
        }

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        if (isActive && edgeHp > 0.1) {
          const offset = edge.from === "center" ? 0 : 0.45;
          const t = ((pulse / (Math.PI * 2)) + offset) % 1;
          const px = from.x + (to.x - from.x) * t;
          const py = from.y + (to.y - from.y) * t;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = edge.color;
          ctx.shadowColor = edge.color;
          ctx.shadowBlur = 10;
          ctx.globalAlpha = edgeHp * 0.95;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      }

      for (const node of nodes) {
        const hp = hoverProgress[node.id] ?? 0;
        const isInChain = activeCategory && (
          node.id === activeCategory ||
          node.categoryId === activeCategory ||
          node.id === "center"
        );
        const dimmed = !!activeCategory && !isInChain && node.id !== "center";
        const baseAlpha = dimmed ? Math.max(1 - maxHp * 0.82, 0.15) : 1;

        ctx.globalAlpha = baseAlpha;

        if (node.type === "center") {
          const pulseR = node.radius + 6 + Math.sin(pulse) * 4;

          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = SIGNAL;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.15;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 12, 0, Math.PI * 2);
          ctx.strokeStyle = SIGNAL;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = 0.3;
          ctx.setLineDash([3, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;

          const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
          grad.addColorStop(0, `rgba(${hexToRgb(SIGNAL)},0.18)`);
          grad.addColorStop(1, `rgba(${hexToRgb(SIGNAL)},0.04)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.strokeStyle = SIGNAL;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = SIGNAL;
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = SIGNAL;
          ctx.shadowColor = SIGNAL;
          ctx.shadowBlur = 6;
          ctx.fillText("M.Rudovskyi", node.x, node.y);
          ctx.shadowBlur = 0;

        } else if (node.type === "category") {
          const rgb = hexToRgb(node.color);
          const glowAlpha = 0.08 + hp * 0.2;

          const ggrad = ctx.createRadialGradient(
            node.x, node.y, node.radius * 0.4,
            node.x, node.y, node.radius * 2
          );
          ggrad.addColorStop(0, `rgba(${rgb},${glowAlpha})`);
          ggrad.addColorStop(1, `rgba(${rgb},0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = ggrad;
          ctx.globalAlpha = baseAlpha;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = SURFACE2;
          ctx.fill();

          ctx.strokeStyle = node.color;
          ctx.lineWidth = 0.8 + hp * 1.2;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = hp * 16;
          ctx.stroke();
          ctx.shadowBlur = 0;

          drawHudCorners(ctx, node.x, node.y, node.radius, node.color, 0.3 + hp * 0.7);

          ctx.font = `${hp > 0.5 ? "bold " : ""}10px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = lerpColor(TEXT, node.color, hp);
          ctx.shadowColor = node.color;
          ctx.shadowBlur = hp * 8;
          const parts = node.label.split(" & ");
          if (parts.length > 1) {
            ctx.fillText(parts[0], node.x, node.y - 7);
            ctx.fillText("& " + parts[1], node.x, node.y + 7);
          } else if (node.label.includes(" / ")) {
            const p2 = node.label.split(" / ");
            ctx.fillText(p2[0], node.x, node.y - 7);
            ctx.fillText("/ " + p2[1], node.x, node.y + 7);
          } else {
            ctx.fillText(node.label, node.x, node.y);
          }
          ctx.shadowBlur = 0;

        } else {
          const rgb = hexToRgb(node.color);
          ctx.font = `${hp > 0.5 ? "bold " : ""}11px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const tw = ctx.measureText(node.label).width;
          const pw = tw + 18;
          const ph = 24;

          drawRoundRect(ctx, node.x - pw / 2, node.y - ph / 2, pw, ph, 4);
          ctx.fillStyle = `rgba(${rgb},${hp * 0.2})`;
          ctx.fill();
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 0.8 + hp * 0.7;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = hp * 14;
          ctx.globalAlpha = baseAlpha * (0.4 + hp * 0.6);
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = baseAlpha;
          ctx.fillStyle = lerpColor(MUTED2, node.color, hp);
          ctx.fillText(node.label, node.x, node.y);
        }

        ctx.globalAlpha = 1;
      }
    }

    function loop() {
      simulate();
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      ro.disconnect();
    };
  }, [init]);

  return (
    <div ref={containerRef} className="relative w-full rounded-lg border border-border bg-surface overflow-hidden">
      <canvas ref={canvasRef} className="w-full block" />
    </div>
  );
}

export default function SkillGraph() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="stack" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="05" command="cat stack.yml" title="Skill Graph" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          {isMobile ? <MobileSkillList /> : <SkillGraphCanvas />}
        </motion.div>

        {!isMobile && (
          <div className="flex flex-wrap gap-4 mt-4">
            {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
              <span key={cat} className="flex items-center gap-1.5 font-mono text-xs text-muted2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: color, boxShadow: `0 0 5px ${color}` }}
                />
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}