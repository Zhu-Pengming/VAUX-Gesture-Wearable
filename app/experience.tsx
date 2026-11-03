"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

const scenes = [
  { id: "create", number: "01", label: "Create", eyebrow: "Gesture as a command", title: "Capture without touching.", body: "Use a simple gesture to remotely trigger a photo or recording—so the creative moment is never interrupted by a screen or button." },
  { id: "express", number: "02", label: "Express", eyebrow: "Gesture as expression", title: "Turn movement into expression.", body: "Translate natural hand movement into music or responsive visuals, making the body an instrument for creation and performance." },
  { id: "control", number: "03", label: "Control", eyebrow: "Gesture as an interface", title: "One gesture. Multiple experiences.", body: "Move between computers, tablets, and connected experiences with one shared gesture language instead of another layer of controls." },
] as const;

type SceneId = (typeof scenes)[number]["id"];

export function Experience() {
  const [scene, setScene] = useState<SceneId>("create");
  const selected = scenes.find((item) => item.id === scene)!;

  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="VAUX home">VAUX<span className="brand-dot">•</span></a>
        <nav aria-label="Primary navigation"><a href="#vision">Vision</a><a href="#experiences">Experiences</a><a href="#developers">Developers</a></nav>
        <a className="nav-cta" href="#waitlist">Join waitlist <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="overline reveal-in">VAUX / HUMAN INTERFACE</p>
          <h1 className="display reveal-in delay-1">Beyond<br /><em>Touch.</em></h1>
          <div className="hero-sub reveal-in delay-2"><p>Movement is the interface.</p><a href="#vision">Explore the concept <span>↓</span></a></div>
        </div>
        <HeroObject />
        <div className="hero-foot"><span>Less machine.<br />More movement.</span><span className="concept-label">Concept visualization<br />Product design subject to change</span></div>
      </section>

      <section className="vision" id="vision">
        <p className="section-index">01 / THE IDEA</p>
        <div className="vision-copy"><p className="vision-kicker">What if movement<br />became the interface?</p><h2>Technology should feel less like a machine—and more like an extension of you.</h2></div>
        <div className="evolution" aria-label="From touch to movement">
          <div className="evolution-step"><span>01</span><strong>Touch</strong><p>Interaction begins on a surface.</p><div className="touch-graphic"><i /></div></div>
          <div className="evolution-step"><span>02</span><strong>Gesture</strong><p>A natural action becomes a signal.</p><div className="gesture-graphic"><i /><i /><i /></div></div>
          <div className="evolution-step featured"><span>03</span><strong>Movement</strong><p>The body becomes a continuous interface.</p><div className="movement-graphic"><i /><i /><i /><i /></div></div>
        </div>
      </section>

      <section className="experiences" id="experiences">
        <div className="section-heading"><p className="section-index">02 / EXPERIENCES</p><h2>Three ways to<br />move beyond touch.</h2><p>Not features to memorize. A progression from a simple command to a more natural language between people and technology.</p></div>
        <div className="playground">
          <div className="playground-top"><span>GESTURE PLAYGROUND</span><span className="live-dot"><i /> CONCEPT DEMO</span></div>
          <div className="scene-tabs" role="tablist" aria-label="Concept scenarios">
            {scenes.map((item) => <button key={item.id} role="tab" aria-selected={scene === item.id} onClick={() => setScene(item.id)}><span>{item.number}</span>{item.label}</button>)}
          </div>
          <div className="scene-stage">
            <div className="scene-copy" key={`${scene}-copy`}><p>{selected.eyebrow}</p><h3>{selected.title}</h3><p className="scene-body">{selected.body}</p></div>
            <div className="scene-demo">{scene === "create" && <CaptureDemo />}{scene === "express" && <MovementCanvas />}{scene === "control" && <DeviceControl />}</div>
          </div>
          <p className="demo-disclaimer">Interactive concept only. This simulation does not represent released hardware, recognition accuracy, or device compatibility.</p>
        </div>
      </section>

      <section className="product" id="product">
        <div className="section-heading light"><p className="section-index">03 / THE OBJECT</p><h2>Quiet hardware.<br />Natural intent.</h2><p>A wearable concept imagined to stay out of the way—until movement needs to become meaning.</p></div>
        <div className="product-board">
          <div className="product-render"><WearableShape /><span>CONCEPT / 01</span></div>
          <div className="product-notes">
            <article><span>01</span><h3>Wear</h3><p>A compact form designed around the hand, where intent begins.</p></article>
            <article><span>02</span><h3>Move</h3><p>Natural gestures become an input signal—discrete or continuous.</p></article>
            <article><span>03</span><h3>Map</h3><p>Experiences decide what each movement should mean.</p></article>
          </div>
        </div>
        <p className="legal-note">Early design exploration. Appearance and interaction examples are conceptual and do not represent final product capabilities.</p>
      </section>

      <section className="developers" id="developers">
        <div className="dev-intro"><p className="section-index">04 / DEVELOPERS</p><h2>Build with<br /><em>movement.</em></h2><p>Explore how gesture signals could be translated into actions, instruments, and entirely new experiences.</p><a href="#waitlist">Request Dev Kit access <span>↗</span></a></div>
        <div className="code-window" aria-label="Illustrative API concept">
          <div className="code-title"><span>gesture-map.ts</span><span>API CONCEPT</span></div>
          <pre><code><span className="code-muted">// Illustrative API concept — not an AUX SDK</span>{`\n`}<span className="code-violet">gesture</span>.on(<span className="code-silver">&quot;pinch&quot;</span>, ({`{`} strength {`}`}) ={`>`} {`{`}{`\n`}  <span className="code-violet">experience</span>.capture({`{`} intensity: strength {`}`});{`\n`}{`}`});{`\n\n`}<span className="code-violet">gesture</span>.stream(<span className="code-silver">&quot;movement&quot;</span>, ({`{`} x, y, velocity {`}`}) ={`>`} {`{`}{`\n`}  <span className="code-violet">canvas</span>.express({`{`} x, y, velocity {`}`});{`\n`}{`}`});</code></pre>
          <div className="code-modules"><span>Gesture input</span><span>Action mapping</span><span>Creative possibilities</span></div>
        </div>
      </section>

      <Waitlist />
      <footer><a className="brand" href="#top">VAUX<span className="brand-dot">•</span></a><p>Mobility. Wearables.<br />Human movement intelligence.</p><p>© 2026 VAUX<br />Concept experience</p></footer>
    </main>
  );
}

function HeroObject() {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) { const rect = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - 0.5; const y = (event.clientY - rect.top) / rect.height - 0.5; ref.current?.style.setProperty("--rx", `${-y * 15}deg`); ref.current?.style.setProperty("--ry", `${x * 22}deg`); }
  return <div className="hero-object-wrap" onPointerMove={move} onPointerLeave={() => { ref.current?.style.setProperty("--rx", "-5deg"); ref.current?.style.setProperty("--ry", "-12deg"); }}><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="hero-object" ref={ref}><WearableShape /></div><div className="gesture-path"><i /><i /><i /></div></div>;
}

function WearableShape() {
  return <div className="wearable" aria-label="Concept wearable visualization"><div className="wearable-band"><div className="band-shine" /></div><div className="wearable-core"><span className="core-ring" /><span className="core-mark">V</span><span className="core-light" /></div></div>;
}

function CaptureDemo() {
  const [holding, setHolding] = useState(false); const [shots, setShots] = useState(0); const [flash, setFlash] = useState(false); const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function start() { setHolding(true); timer.current = setTimeout(() => setHolding(false), 1400); }
  function end() { if (!holding) return; if (timer.current) clearTimeout(timer.current); setHolding(false); setShots((value) => value + 1); setFlash(true); setTimeout(() => setFlash(false), 280); }
  return <button className={`capture-demo ${holding ? "holding" : ""}`} onPointerDown={start} onPointerUp={end} onPointerLeave={end}><span className={`camera-flash ${flash ? "active" : ""}`} /><span className="viewfinder"><i /><i /><i /><i /><b>+</b></span><span className="capture-status">AUX / CAPTURE SIMULATION <b>SHOTS {String(shots).padStart(2, "0")}</b></span><span className="hold-control"><i />{holding ? "Release to capture" : "Hold gesture"}</span></button>;
}

function MovementCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null); const points = useRef<{ x: number; y: number; age: number; speed: number }[]>([]); const [intensity, setIntensity] = useState(55);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return; let frame = 0;
    function resize() { const rect = canvas!.getBoundingClientRect(); canvas!.width = rect.width * devicePixelRatio; canvas!.height = rect.height * devicePixelRatio; ctx!.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); }
    resize(); window.addEventListener("resize", resize);
    function draw() { const w = canvas!.clientWidth, h = canvas!.clientHeight; ctx!.clearRect(0, 0, w, h); const pts = points.current; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; const opacity = Math.max(0, 1 - b.age / 80); ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.strokeStyle = `rgba(232,235,239,${opacity * 0.75})`; ctx!.lineWidth = 1 + b.speed * intensity / 2400; ctx!.stroke(); ctx!.beginPath(); ctx!.arc(b.x, b.y, 1 + b.speed * intensity / 1800, 0, Math.PI * 2); ctx!.fillStyle = `rgba(255,255,255,${opacity})`; ctx!.fill(); } points.current = pts.map((p) => ({ ...p, age: p.age + 1 })).filter((p) => p.age < 80); frame = requestAnimationFrame(draw); }
    frame = requestAnimationFrame(draw); return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [intensity]);
  function trace(event: PointerEvent<HTMLDivElement>) { const rect = event.currentTarget.getBoundingClientRect(); const prev = points.current.at(-1); const x = event.clientX - rect.left, y = event.clientY - rect.top; const speed = prev ? Math.hypot(x - prev.x, y - prev.y) : 1; points.current.push({ x, y, age: 0, speed: Math.min(speed, 32) }); }
  return <div className="movement-canvas" onPointerMove={trace}><canvas ref={canvasRef} /><div className="canvas-idle"><span>MOVE TO EXPRESS</span><i /></div><label>Movement intensity <output>{intensity}%</output><input type="range" min="20" max="100" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} /></label></div>;
}

function DeviceControl() {
  const devices = ["Laptop", "Display", "Tablet"]; const [active, setActive] = useState(0); const startX = useRef(0);
  function end(event: PointerEvent<HTMLDivElement>) { const delta = event.clientX - startX.current; if (Math.abs(delta) > 28) setActive((value) => (value + (delta < 0 ? 1 : -1) + devices.length) % devices.length); }
  return <div className="device-demo" onPointerDown={(e) => { startX.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerUp={end}><div className="device-row">{devices.map((name, index) => <div key={name} className={`device ${active === index ? "active" : ""} device-${index}`}><span className="device-screen"><i /><i /><i /></span><b>{name}</b></div>)}</div><div className="swipe-line"><button onClick={() => setActive((active + 2) % 3)} aria-label="Previous device">←</button><span><i style={{ transform: `translateX(${active * 100}%)` }} /></span><button onClick={() => setActive((active + 1) % 3)} aria-label="Next device">→</button></div><p>{devices[active]} selected <span>Primary workspace</span></p></div>;
}

function Waitlist() {
  const [email, setEmail] = useState(""); const [interest, setInterest] = useState("product"); const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle"); const [message, setMessage] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); setState("loading"); setMessage(""); try { const response = await fetch("/api/waitlist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, interest }) }); const data = await response.json() as { message?: string }; if (!response.ok) throw new Error(data.message || "Please try again."); setState("success"); setMessage("You’re on the list. We’ll keep you close to what moves next."); setEmail(""); } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "Please try again."); } }
  return <section className="waitlist" id="waitlist"><div className="waitlist-copy"><p className="section-index">05 / EARLY ACCESS</p><h2>Be first to<br /><em>move.</em></h2><p>Join the VAUX waitlist for early product concepts, developer access, and updates from the edge of human interaction.</p></div><form onSubmit={submit} noValidate><div className="interest-toggle" role="group" aria-label="Interest"><button type="button" className={interest === "product" ? "active" : ""} onClick={() => setInterest("product")}>Product</button><button type="button" className={interest === "developer" ? "active" : ""} onClick={() => setInterest("developer")}>Developer / Dev Kit</button></div><label htmlFor="waitlist-email">Email address</label><div className="email-row"><input id="waitlist-email" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /><button disabled={state === "loading"}>{state === "loading" ? "Joining…" : "Join waitlist"}<span>↗</span></button></div><p className={`form-message ${state}`} aria-live="polite">{message || "One email. No noise. Unsubscribe anytime."}</p></form></section>;
}
