"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

const scenes = [
  { id: "create", number: "01", label: "Create", eyebrow: "Gesture as a command", instruction: "Pinch to capture", title: "Capture without touching.", body: "Your phone is across the room, framing the shot. A pinch triggers the shutter—or starts recording—without breaking the moment to reach for a screen." },
  { id: "express", number: "02", label: "Express", eyebrow: "Gesture as expression", instruction: "Move to create · Hold to gather", title: "Turn movement into expression.", body: "During a performance, hand position directs the visual field, speed creates energy, and a held gesture pulls the particles into focus." },
  { id: "control", number: "03", label: "Control", eyebrow: "Gesture as an interface", instruction: "Swipe to switch · Pinch to confirm", title: "One gesture. Multiple experiences.", body: "At a multi-device desk, a horizontal swipe moves focus between screens. A pinch confirms the action on the selected device." },
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
          <p className="overline reveal-in">VAUX PRESENTS / AUX GESTURE WEARABLE</p>
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
            <div className="scene-copy" key={`${scene}-copy`}><p>{selected.eyebrow}</p><span className="scene-instruction"><i />{selected.instruction}</span><h3>{selected.title}</h3><p className="scene-body">{selected.body}</p></div>
            <div className="scene-demo">{scene === "create" && <CaptureDemo />}{scene === "express" && <MovementCanvas />}{scene === "control" && <DeviceControl />}</div>
          </div>
          <p className="demo-disclaimer">Interactive concept only. This simulation does not represent released hardware, recognition accuracy, or device compatibility.</p>
        </div>
      </section>

      <section className="product" id="product">
        <div className="section-heading light"><p className="section-index">03 / THE OBJECT</p><h2>Quiet hardware.<br />Natural intent.</h2><p>AUX is an early wrist-worn interaction concept by VAUX—imagined to sense intentional hand movement and translate it into digital input.</p></div>
        <div className="product-board">
          <div className="product-render"><OnBodyConcept /><span>WRIST-WORN CONCEPT / 01</span></div>
          <div className="product-notes">
            <article><span>01 / POSITION</span><h3>Wear</h3><p>A compact band sits at the wrist, close to the movement of the hand.</p></article>
            <article><span>02 / INPUT</span><h3>Move</h3><p>Pinch, swipe, and motion are illustrated as discrete or continuous signals.</p></article>
            <article><span>03 / RESPONSE</span><h3>Map</h3><p>The receiving experience decides whether that signal captures, creates, or controls.</p></article>
          </div>
        </div>
        <p className="legal-note">Early design exploration. Appearance and interaction examples are conceptual and do not represent final product capabilities.</p>
      </section>

      <section className="developers" id="developers">
        <div className="dev-intro"><p className="section-index">04 / DEVELOPERS</p><h2>Build with<br /><em>movement.</em></h2><p>Explore how gesture signals could be translated into actions, instruments, and entirely new experiences.</p><a href="#waitlist">Request Dev Kit access <span>↗</span></a></div>
        <div className="code-window" aria-label="Illustrative API concept">
          <div className="code-title"><span>gesture-map.ts</span><span>API CONCEPT</span></div>
          <pre><code><span className="code-muted">// Illustrative API concept — not a released AUX SDK</span>{`\n`}<span className="code-violet">gesture</span>.on(<span className="code-silver">&quot;pinch&quot;</span>, ({`{`} strength {`}`}) ={`>`} {`{`}{`\n`}  <span className="code-violet">experience</span>.capture({`{`} intensity: strength {`}`});{`\n`}{`}`});{`\n\n`}<span className="code-violet">gesture</span>.stream(<span className="code-silver">&quot;movement&quot;</span>, ({`{`} x, y, velocity {`}`}) ={`>`} {`{`}{`\n`}  <span className="code-violet">canvas</span>.express({`{`} x, y, velocity {`}`});{`\n`}{`}`});</code></pre>
          <div className="dev-flow"><article><span>01</span><strong>Gesture input</strong><p>A pinch, swipe, or continuous movement signal.</p></article><i>→</i><article><span>02</span><strong>Action mapping</strong><p>Translate intent into a clear application event.</p></article><i>→</i><article><span>03</span><strong>Creative experience</strong><p>Capture, perform, navigate—or invent something new.</p></article></div>
        </div>
      </section>

      <Waitlist />
      <footer><a className="brand" href="#top">VAUX<span className="brand-dot">•</span></a><p>AUX Gesture Wearable<br />An early VAUX human-interface concept.</p><p>© 2026 VAUX<br />Concept experience</p></footer>
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

function OnBodyConcept() {
  return (
    <div className="onbody" aria-label="AUX wrist-worn concept diagram">
      <div className="hand-outline">
        <i className="finger f1" /><i className="finger f2" /><i className="finger f3" /><i className="finger f4" />
        <i className="palm" /><i className="thumb" /><i className="forearm" />
      </div>
      <div className="wrist-device"><WearableShape /></div>
      <div className="gesture-callout input-callout"><span>01</span><b>INPUT</b><p>Pinch · Swipe · Motion</p></div>
      <div className="gesture-callout position-callout"><span>02</span><b>POSITION</b><p>Worn at the wrist</p></div>
      <div className="signal-lines"><i /><i /><i /></div>
      <div className="response-chip"><span>03 / DIGITAL RESPONSE</span><b>CAPTURE</b><b>EXPRESS</b><b>CONTROL</b></div>
    </div>
  );
}

function CaptureDemo() {
  const [holding, setHolding] = useState(false);
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [recording, setRecording] = useState(false);
  const [shots, setShots] = useState(0);
  const [flash, setFlash] = useState(false);
  function start(event: PointerEvent<HTMLButtonElement>) { event.currentTarget.setPointerCapture(event.pointerId); setHolding(true); }
  function end() {
    if (!holding) return;
    setHolding(false);
    if (mode === "video") { setRecording((value) => !value); return; }
    setShots((value) => value + 1); setFlash(true); setTimeout(() => setFlash(false), 280);
  }
  return (
    <div className={`capture-demo ${holding ? "holding" : ""} ${recording ? "recording" : ""}`}>
      <span className={`camera-flash ${flash ? "active" : ""}`} />
      <div className="capture-mode"><button className={mode === "photo" ? "active" : ""} onClick={() => setMode("photo")}>Photo</button><button className={mode === "video" ? "active" : ""} onClick={() => setMode("video")}>Video</button></div>
      <span className="viewfinder"><i /><i /><i /><i /><b>+</b></span>
      <span className="capture-status">AUX / REMOTE CAMERA CONCEPT <b>{recording ? "● REC 00:08" : `SHOTS ${String(shots).padStart(2, "0")}`}</b></span>
      <button className="gesture-trigger" onPointerDown={start} onPointerUp={end} onPointerCancel={() => setHolding(false)} aria-label={mode === "photo" ? "Hold and release to take a photo" : "Hold and release to toggle recording"}><span className="pinch-icon"><i /><i /></span><span>{holding ? "Release gesture" : mode === "photo" ? "Pinch to capture" : recording ? "Pinch to stop" : "Pinch to record"}</span></button>
      {shots > 0 && <span className="photo-preview" key={shots}><i /><b>CAPTURED / {String(shots).padStart(2, "0")}</b></span>}
    </div>
  );
}

function MovementCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; size: number; seed: number }[]>([]);
  const cursor = useRef({ x: 0, y: 0, px: 0, py: 0, speed: 0, active: false, down: false });
  const [intensity, setIntensity] = useState(64);
  const [engaged, setEngaged] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return; let frame = 0;
    function resize() { const rect = canvas!.getBoundingClientRect(); canvas!.width = rect.width * devicePixelRatio; canvas!.height = rect.height * devicePixelRatio; ctx!.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); if (!particles.current.length) particles.current = Array.from({ length: 130 }, (_, index) => ({ x: Math.random() * rect.width, y: Math.random() * rect.height, vx: 0, vy: 0, size: .7 + Math.random() * 2.2, seed: index * .71 })); }
    resize(); window.addEventListener("resize", resize);
    function draw(time = 0) {
      const w = canvas!.clientWidth, h = canvas!.clientHeight; ctx!.clearRect(0, 0, w, h);
      for (const p of particles.current) {
        const dx = cursor.current.x - p.x, dy = cursor.current.y - p.y; const distance = Math.max(18, Math.hypot(dx, dy));
        p.vx += Math.sin(time * .0007 + p.seed) * .006; p.vy += Math.cos(time * .0005 + p.seed) * .006;
        if (cursor.current.active) {
          const force = cursor.current.down ? .68 : Math.min(.38, cursor.current.speed * .018) * (intensity / 65);
          p.vx += (dx / distance) * force; p.vy += (dy / distance) * force;
          if (!cursor.current.down && distance < 90) { p.vx -= (dx / distance) * .22; p.vy -= (dy / distance) * .22; }
        }
        p.vx *= cursor.current.down ? .88 : .965; p.vy *= cursor.current.down ? .88 : .965; p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20; if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
        const glow = cursor.current.active ? Math.max(0, 1 - distance / 340) : .18;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.size + glow * 1.4, 0, Math.PI * 2); ctx!.fillStyle = `rgba(232,229,255,${.24 + glow * .72})`; ctx!.fill();
        if (distance < 105 && cursor.current.active) { ctx!.beginPath(); ctx!.moveTo(p.x, p.y); ctx!.lineTo(cursor.current.x, cursor.current.y); ctx!.strokeStyle = `rgba(204,194,255,${(1 - distance / 105) * .12})`; ctx!.stroke(); }
      }
      cursor.current.speed *= .88; frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw); return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [intensity]);
  function trace(event: PointerEvent<HTMLDivElement>) { const rect = event.currentTarget.getBoundingClientRect(); const x = event.clientX - rect.left, y = event.clientY - rect.top; cursor.current.speed = Math.min(40, Math.hypot(x - cursor.current.px, y - cursor.current.py)); Object.assign(cursor.current, { x, y, px: x, py: y, active: true }); setEngaged(true); }
  return <div className="movement-canvas" onPointerMove={trace} onPointerDown={(event) => { if ((event.target as HTMLElement).tagName === "INPUT") return; cursor.current.down = true; setEngaged(true); }} onPointerUp={() => { cursor.current.down = false; }} onPointerCancel={() => { cursor.current.down = false; }} onPointerLeave={() => { cursor.current.active = false; cursor.current.down = false; }}><canvas ref={canvasRef} /><div className={`canvas-idle ${engaged ? "engaged" : ""}`}><span>{cursor.current.down ? "GATHERING MOVEMENT" : "MOVE TO CREATE · HOLD TO GATHER"}</span><i /></div><label>Movement intensity <output>{intensity}%</output><input type="range" min="20" max="100" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} /></label></div>;
}

function DeviceControl() {
  const devices = ["Laptop", "Display", "Tablet"]; const [active, setActive] = useState(0); const [confirmed, setConfirmed] = useState<number | null>(null); const startX = useRef(0);
  function switchTo(next: number) { setActive(next); setConfirmed(null); }
  function end(event: PointerEvent<HTMLDivElement>) { const delta = event.clientX - startX.current; if (Math.abs(delta) > 28) switchTo((active + (delta < 0 ? 1 : -1) + devices.length) % devices.length); }
  return <div className="device-demo" onPointerDown={(e) => { if ((e.target as HTMLElement).closest("button")) return; startX.current = e.clientX; }} onPointerUp={(e) => { if ((e.target as HTMLElement).closest("button")) return; end(e); }}><div className="control-instruction"><span>SWIPE</span><i />MOVE FOCUS<i /><span>PINCH</span><i />CONFIRM</div><div className="device-row">{devices.map((name, index) => <div key={name} className={`device ${active === index ? "active" : ""} ${confirmed === index ? "confirmed" : ""} device-${index}`}><span className="device-screen"><i /><i /><i />{confirmed === index && <em>CONFIRMED ✓</em>}</span><b>{name}</b></div>)}</div><div className="swipe-line"><button onClick={() => switchTo((active + 2) % 3)} aria-label="Previous device">←</button><span><i style={{ transform: `translateX(${active * 100}%)` }} /></span><button onClick={() => switchTo((active + 1) % 3)} aria-label="Next device">→</button></div><button className="confirm-gesture" onClick={() => setConfirmed(active)}><span className="pinch-icon"><i /><i /></span>{confirmed === active ? "Action confirmed" : "Pinch to confirm"}</button><p>{devices[active]} selected <span>{confirmed === active ? "Command received" : "Primary workspace"}</span></p></div>;
}

function Waitlist() {
  const [email, setEmail] = useState(""); const [interest, setInterest] = useState("product"); const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle"); const [message, setMessage] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); setState("loading"); setMessage(""); try { const response = await fetch("/api/waitlist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, interest }) }); const data = await response.json() as { message?: string }; if (!response.ok) throw new Error(data.message || "Please try again."); setState("success"); setMessage("You’re on the list. We’ll keep you close to what moves next."); setEmail(""); } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "Please try again."); } }
  return <section className="waitlist" id="waitlist"><div className="waitlist-copy"><p className="section-index">05 / EARLY ACCESS</p><h2>Be first to<br /><em>move.</em></h2><p>Join the AUX early access list from VAUX for product concepts, developer access, and updates from the edge of human interaction.</p></div><form onSubmit={submit} noValidate><div className="interest-toggle" role="group" aria-label="Interest"><button type="button" className={interest === "product" ? "active" : ""} onClick={() => setInterest("product")}>Product</button><button type="button" className={interest === "developer" ? "active" : ""} onClick={() => setInterest("developer")}>Developer / Dev Kit</button></div><label htmlFor="waitlist-email">Email address</label><div className="email-row"><input id="waitlist-email" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /><button disabled={state === "loading"}>{state === "loading" ? "Joining…" : "Join waitlist"}<span>↗</span></button></div><p className={`form-message ${state}`} aria-live="polite">{message || "One email. No noise. Unsubscribe anytime."}</p></form></section>;
}
