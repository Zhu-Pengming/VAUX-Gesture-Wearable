"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

const scenes = [
  { id: "create", number: "01", label: "Create", labelZh: "创作", eyebrow: "Gesture as a command", eyebrowZh: "手势即指令", instruction: "Pinch to capture", instructionZh: "捏合拍摄", title: "Capture without touching.", titleZh: "无需触碰，完成拍摄。", body: "Your phone is across the room, framing the shot. A pinch triggers the shutter—or starts recording—without breaking the moment to reach for a screen.", bodyZh: "手机在远处完成构图后，只需一个捏合动作即可触发快门或开始录像，无需走回屏幕打断创作。" },
  { id: "express", number: "02", label: "Express", labelZh: "表达", eyebrow: "Gesture as expression", eyebrowZh: "手势即表达", instruction: "Move or use camera · Hold to gather", instructionZh: "移动或开启摄像头 · 按住聚集", title: "Turn movement into expression.", titleZh: "让动作成为视觉表达。", body: "Move with a pointer or opt into camera motion control. Position directs the visual field, speed creates energy, and a held gesture gathers the particles.", bodyZh: "可使用鼠标、触摸，或主动开启摄像头动作控制。位置决定视觉方向，速度形成能量，按住动作让粒子聚集。" },
  { id: "control", number: "03", label: "Control", labelZh: "控制", eyebrow: "Gesture as an interface", eyebrowZh: "手势即界面", instruction: "Swipe to switch · Pinch to confirm", instructionZh: "挥动切换 · 捏合确认", title: "One gesture. Multiple experiences.", titleZh: "一套手势，连接多个设备。", body: "At a multi-device desk, a horizontal swipe moves focus between screens. A pinch confirms the action on the selected device.", bodyZh: "在多设备桌面中，横向挥动即可切换屏幕焦点，捏合则确认当前设备上的操作。" },
] as const;

type SceneId = (typeof scenes)[number]["id"];
type Lang = "en" | "zh";

const tx = (lang: Lang, en: string, zh: string) => lang === "zh" ? zh : en;

export function Experience() {
  const [scene, setScene] = useState<SceneId>("create");
  const [lang, setLang] = useState<Lang>("en");
  const selected = scenes.find((item) => item.id === scene)!;
  const tr = (en: string, zh: string) => tx(lang, en, zh);
  useEffect(() => { document.documentElement.lang = lang === "zh" ? "zh-CN" : "en"; }, [lang]);

  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="VAUX home">VAUX<span className="brand-dot">•</span></a>
        <nav aria-label="Primary navigation"><a href="#vision">{tr("Vision", "理念")}</a><a href="#experiences">{tr("Experiences", "体验")}</a><a href="#developers">{tr("Developers", "开发者")}</a></nav>
        <div className="nav-actions"><button className="lang-toggle" onClick={() => setLang(lang === "en" ? "zh" : "en")} aria-label={tr("Switch to Chinese", "切换到英文")}>{lang === "en" ? "中文" : "EN"}</button><a className="nav-cta" href="#waitlist">{tr("Join waitlist", "加入候选名单")} <span>↗</span></a></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="overline reveal-in">{tr("VAUX PRESENTS / AUX GESTURE WEARABLE", "VAUX 呈现 / AUX 手势穿戴概念")}</p>
          <h1 className={`display reveal-in delay-1 ${lang === "zh" ? "display-zh" : ""}`}>{lang === "zh" ? <>超越<br /><em>触控。</em></> : <>Beyond<br /><em>Touch.</em></>}</h1>
          <div className="hero-sub reveal-in delay-2"><p>{tr("Movement is the interface.", "人的动作，就是界面。")}</p><a href="#vision">{tr("Explore the concept", "探索概念")} <span>↓</span></a></div>
        </div>
        <HeroObject />
        <div className="hero-foot"><span>{tr("Less machine.", "少一点机器感。")}<br />{tr("More movement.", "多一点自然动作。")}</span><span className="concept-label">{tr("Concept visualization", "概念视觉演示")}<br />{tr("Product design subject to change", "产品设计可能调整")}</span></div>
      </section>

      <section className="vision" id="vision">
        <p className="section-index">01 / {tr("THE IDEA", "核心理念")}</p>
        <div className="vision-copy"><p className="vision-kicker">{tr("What if movement became the interface?", "如果动作本身就是界面？")}</p><h2>{tr("Technology should feel less like a machine—and more like an extension of you.", "科技不应更像机器，而应更像身体与人的延伸。")}</h2></div>
        <div className="evolution" aria-label="From touch to movement">
          <div className="evolution-step"><span>01</span><strong>{tr("Touch", "触控")}</strong><p>{tr("Interaction begins on a surface.", "交互从一块表面开始。")}</p><div className="touch-graphic"><i /></div></div>
          <div className="evolution-step"><span>02</span><strong>{tr("Gesture", "手势")}</strong><p>{tr("A natural action becomes a signal.", "自然动作成为输入信号。")}</p><div className="gesture-graphic"><i /><i /><i /></div></div>
          <div className="evolution-step featured"><span>03</span><strong>{tr("Movement", "动作")}</strong><p>{tr("The body becomes a continuous interface.", "身体成为连续的交互界面。")}</p><div className="movement-graphic"><i /><i /><i /><i /></div></div>
        </div>
      </section>

      <section className="experiences" id="experiences">
        <div className="section-heading"><p className="section-index">02 / {tr("EXPERIENCES", "使用场景")}</p><h2>{tr("Three ways to move beyond touch.", "三种方式，超越触控。")}</h2><p>{tr("Not features to memorize. A progression from a simple command to a more natural language between people and technology.", "不是功能清单，而是从单一指令走向人与技术之间更自然的交互语言。")}</p></div>
        <div className="playground">
          <div className="playground-top"><span>{tr("GESTURE PLAYGROUND", "手势体验场")}</span><span className="live-dot"><i /> {tr("CONCEPT DEMO", "概念演示")}</span></div>
          <div className="scene-tabs" role="tablist" aria-label="Concept scenarios">
            {scenes.map((item) => <button key={item.id} role="tab" aria-selected={scene === item.id} onClick={() => setScene(item.id)}><span>{item.number}</span>{lang === "zh" ? item.labelZh : item.label}</button>)}
          </div>
          <div className="scene-stage">
            <div className="scene-copy" key={`${scene}-${lang}`}><p>{lang === "zh" ? selected.eyebrowZh : selected.eyebrow}</p><span className="scene-instruction"><i />{lang === "zh" ? selected.instructionZh : selected.instruction}</span><h3>{lang === "zh" ? selected.titleZh : selected.title}</h3><p className="scene-body">{lang === "zh" ? selected.bodyZh : selected.body}</p></div>
            <div className="scene-demo">{scene === "create" && <CaptureDemo lang={lang} />}{scene === "express" && <MovementCanvas lang={lang} />}{scene === "control" && <DeviceControl lang={lang} />}</div>
          </div>
          <p className="demo-disclaimer">{tr("Interactive concept only. This simulation does not represent released hardware, recognition accuracy, or device compatibility.", "仅为交互概念演示，不代表已发布硬件、识别准确率或设备兼容能力。")}</p>
        </div>
      </section>

      <section className="product" id="product">
        <div className="section-heading light"><p className="section-index">03 / {tr("THE OBJECT", "产品概念")}</p><h2>{tr("Quiet hardware. Natural intent.", "安静的硬件，自然的意图。")}</h2><p>{tr("AUX is an early wrist-worn interaction concept by VAUX—imagined to sense intentional hand movement and translate it into digital input.", "AUX 是 VAUX 的早期腕部交互概念，探索如何感知有意图的手部动作，并将其转化为数字输入。")}</p></div>
        <div className="product-board">
          <div className="product-render"><OnBodyConcept lang={lang} /><span>{tr("WRIST-WORN CONCEPT / 01", "腕部穿戴概念 / 01")}</span></div>
          <div className="product-notes">
            <article><span>01 / {tr("POSITION", "位置")}</span><h3>{tr("Wear", "佩戴")}</h3><p>{tr("A compact band sits at the wrist, close to the movement of the hand.", "紧凑的腕带佩戴在手腕，贴近动作发生的位置。")}</p></article>
            <article><span>02 / {tr("INPUT", "输入")}</span><h3>{tr("Move", "动作")}</h3><p>{tr("Pinch, swipe, and motion are illustrated as discrete or continuous signals.", "捏合、挥动和连续移动被转化为离散或连续信号。")}</p></article>
            <article><span>03 / {tr("RESPONSE", "响应")}</span><h3>{tr("Map", "映射")}</h3><p>{tr("The receiving experience decides whether that signal captures, creates, or controls.", "接收端决定信号用于拍摄、创作，还是设备控制。")}</p></article>
          </div>
        </div>
        <p className="legal-note">{tr("Early design exploration. Appearance and interaction examples are conceptual and do not represent final product capabilities.", "早期设计探索。外观与交互示例均为概念演示，不代表最终产品能力。")}</p>
      </section>

      <section className="developers" id="developers">
        <div className="dev-intro"><p className="section-index">04 / {tr("DEVELOPERS", "开发者")}</p><h2>{tr("Build with movement.", "用动作，构建体验。")}</h2><p>{tr("Explore how gesture signals could be translated into actions, instruments, and entirely new experiences.", "探索如何把手势信号转化为操作、创作工具，以及全新的交互体验。")}</p><a href="#waitlist">{tr("Request Dev Kit access", "申请 Dev Kit 资格")} <span>↗</span></a></div>
        <div className="code-window" aria-label="Illustrative API concept">
          <div className="code-title"><span>gesture-map.ts</span><span>{tr("API CONCEPT", "API 概念")}</span></div>
          <pre><code><span className="code-muted">// Illustrative API concept — not a released AUX SDK</span>{`\n`}<span className="code-violet">gesture</span>.on(<span className="code-silver">&quot;pinch&quot;</span>, ({`{`} strength {`}`}) ={`>`} {`{`}{`\n`}  <span className="code-violet">experience</span>.capture({`{`} intensity: strength {`}`});{`\n`}{`}`});{`\n\n`}<span className="code-violet">gesture</span>.stream(<span className="code-silver">&quot;movement&quot;</span>, ({`{`} x, y, velocity {`}`}) ={`>`} {`{`}{`\n`}  <span className="code-violet">canvas</span>.express({`{`} x, y, velocity {`}`});{`\n`}{`}`});</code></pre>
          <div className="dev-flow"><article><span>01</span><strong>{tr("Gesture input", "手势输入")}</strong><p>{tr("A pinch, swipe, or continuous movement signal.", "捏合、挥动或连续动作信号。")}</p></article><i>→</i><article><span>02</span><strong>{tr("Action mapping", "动作映射")}</strong><p>{tr("Translate intent into a clear application event.", "把人的意图转化为明确的应用事件。")}</p></article><i>→</i><article><span>03</span><strong>{tr("Creative experience", "创意体验")}</strong><p>{tr("Capture, perform, navigate—or invent something new.", "拍摄、表演、导航，或创造全新体验。")}</p></article></div>
        </div>
      </section>

      <Waitlist lang={lang} />
      <footer><a className="brand" href="#top">VAUX<span className="brand-dot">•</span></a><p>{tr("AUX Gesture Wearable", "AUX 手势穿戴设备")}<br />{tr("An early VAUX human-interface concept.", "VAUX 早期人机交互概念。")}</p><p>© 2026 VAUX<br />{tr("Concept experience", "概念体验")}</p></footer>
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

function OnBodyConcept({ lang }: { lang: Lang }) {
  return (
    <div className="onbody" aria-label="AUX wrist-worn concept diagram">
      <div className="hand-outline">
        <i className="finger f1" /><i className="finger f2" /><i className="finger f3" /><i className="finger f4" />
        <i className="palm" /><i className="thumb" /><i className="forearm" />
      </div>
      <div className="wrist-device"><WearableShape /></div>
      <div className="gesture-callout input-callout"><span>01</span><b>{tx(lang, "INPUT", "输入")}</b><p>{tx(lang, "Pinch · Swipe · Motion", "捏合 · 挥动 · 移动")}</p></div>
      <div className="gesture-callout position-callout"><span>02</span><b>{tx(lang, "POSITION", "位置")}</b><p>{tx(lang, "Worn at the wrist", "佩戴于手腕")}</p></div>
      <div className="signal-lines"><i /><i /><i /></div>
      <div className="response-chip"><span>03 / {tx(lang, "DIGITAL RESPONSE", "数字响应")}</span><b>{tx(lang, "CAPTURE", "拍摄")}</b><b>{tx(lang, "EXPRESS", "表达")}</b><b>{tx(lang, "CONTROL", "控制")}</b></div>
    </div>
  );
}

function CaptureDemo({ lang }: { lang: Lang }) {
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
      <div className="capture-mode"><button className={mode === "photo" ? "active" : ""} onClick={() => setMode("photo")}>{tx(lang, "Photo", "拍照")}</button><button className={mode === "video" ? "active" : ""} onClick={() => setMode("video")}>{tx(lang, "Video", "录像")}</button></div>
      <span className="viewfinder"><i /><i /><i /><i /><b>+</b></span>
      <span className="capture-status">AUX / REMOTE CAMERA CONCEPT <b>{recording ? "● REC 00:08" : `SHOTS ${String(shots).padStart(2, "0")}`}</b></span>
      <button className="gesture-trigger" onPointerDown={start} onPointerUp={end} onPointerCancel={() => setHolding(false)} aria-label={mode === "photo" ? "Hold and release to take a photo" : "Hold and release to toggle recording"}><span className="pinch-icon"><i /><i /></span><span>{holding ? tx(lang, "Release gesture", "释放手势") : mode === "photo" ? tx(lang, "Pinch to capture", "捏合拍摄") : recording ? tx(lang, "Pinch to stop", "捏合停止") : tx(lang, "Pinch to record", "捏合录像")}</span></button>
      {shots > 0 && <span className="photo-preview" key={shots}><i /><b>{tx(lang, "CAPTURED", "已拍摄")} / {String(shots).padStart(2, "0")}</b></span>}
    </div>
  );
}

function MovementCanvas({ lang }: { lang: Lang }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sampleCanvas = useRef<HTMLCanvasElement | null>(null);
  const previousFrame = useRef<Uint8ClampedArray | null>(null);
  const lastSample = useRef(0);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; size: number; seed: number }[]>([]);
  const cursor = useRef({ x: 0, y: 0, px: 0, py: 0, speed: 0, active: false, down: false });
  const [intensity, setIntensity] = useState(64);
  const [engaged, setEngaged] = useState(false);
  const [cameraState, setCameraState] = useState<"idle" | "requesting" | "active" | "error">("idle");

  async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) { setCameraState("error"); return; }
    setCameraState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      previousFrame.current = null; setCameraState("active"); setEngaged(true);
    } catch { setCameraState("error"); }
  }
  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop()); streamRef.current = null; previousFrame.current = null; setCameraState("idle"); cursor.current.down = false;
  }
  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return; let frame = 0;
    function resize() { const rect = canvas!.getBoundingClientRect(); canvas!.width = rect.width * devicePixelRatio; canvas!.height = rect.height * devicePixelRatio; ctx!.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); if (!particles.current.length) particles.current = Array.from({ length: 150 }, (_, index) => ({ x: Math.random() * rect.width, y: Math.random() * rect.height, vx: 0, vy: 0, size: .7 + Math.random() * 2.2, seed: index * .71 })); }
    function readCameraMotion(time: number, w: number, h: number) {
      const video = videoRef.current; if (cameraState !== "active" || !video || video.readyState < 2 || time - lastSample.current < 72) return;
      lastSample.current = time; const tracker = sampleCanvas.current ?? document.createElement("canvas"); sampleCanvas.current = tracker; tracker.width = 64; tracker.height = 48;
      const trackerCtx = tracker.getContext("2d", { willReadFrequently: true }); if (!trackerCtx) return; trackerCtx.drawImage(video, 0, 0, 64, 48);
      const data = trackerCtx.getImageData(0, 0, 64, 48).data; const prev = previousFrame.current; previousFrame.current = new Uint8ClampedArray(data); if (!prev) return;
      let weight = 0, sumX = 0, sumY = 0;
      for (let y = 0; y < 48; y += 2) for (let x = 0; x < 64; x += 2) { const i = (y * 64 + x) * 4; const now = (data[i] + data[i + 1] + data[i + 2]) / 3; const before = (prev[i] + prev[i + 1] + prev[i + 2]) / 3; const diff = Math.abs(now - before); if (diff > 24) { weight += diff; sumX += x * diff; sumY += y * diff; } }
      if (weight > 3200) { const x = (1 - sumX / weight / 64) * w; const y = (sumY / weight / 48) * h; const speed = Math.min(40, Math.hypot(x - cursor.current.px, y - cursor.current.py) * .35 + weight / 900); Object.assign(cursor.current, { x, y, px: x, py: y, speed, active: true, down: weight > 26000 }); }
    }
    resize(); window.addEventListener("resize", resize);
    function draw(time = 0) {
      const w = canvas!.clientWidth, h = canvas!.clientHeight; readCameraMotion(time, w, h); ctx!.clearRect(0, 0, w, h);
      for (const p of particles.current) {
        const dx = cursor.current.x - p.x, dy = cursor.current.y - p.y; const distance = Math.max(18, Math.hypot(dx, dy)); p.vx += Math.sin(time * .0007 + p.seed) * .006; p.vy += Math.cos(time * .0005 + p.seed) * .006;
        if (cursor.current.active) { const force = cursor.current.down ? .68 : Math.min(.38, cursor.current.speed * .018) * (intensity / 65); p.vx += (dx / distance) * force; p.vy += (dy / distance) * force; if (!cursor.current.down && distance < 90) { p.vx -= (dx / distance) * .22; p.vy -= (dy / distance) * .22; } }
        p.vx *= cursor.current.down ? .88 : .965; p.vy *= cursor.current.down ? .88 : .965; p.x += p.vx; p.y += p.vy; if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20; if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
        const glow = cursor.current.active ? Math.max(0, 1 - distance / 340) : .18; ctx!.beginPath(); ctx!.arc(p.x, p.y, p.size + glow * 1.4, 0, Math.PI * 2); ctx!.fillStyle = `rgba(232,229,255,${.24 + glow * .72})`; ctx!.fill(); if (distance < 105 && cursor.current.active) { ctx!.beginPath(); ctx!.moveTo(p.x, p.y); ctx!.lineTo(cursor.current.x, cursor.current.y); ctx!.strokeStyle = `rgba(204,194,255,${(1 - distance / 105) * .12})`; ctx!.stroke(); }
      }
      cursor.current.speed *= .88; frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw); return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [intensity, cameraState]);
  function trace(event: PointerEvent<HTMLDivElement>) { if (cameraState === "active") return; const rect = event.currentTarget.getBoundingClientRect(); const x = event.clientX - rect.left, y = event.clientY - rect.top; cursor.current.speed = Math.min(40, Math.hypot(x - cursor.current.px, y - cursor.current.py)); Object.assign(cursor.current, { x, y, px: x, py: y, active: true }); setEngaged(true); }
  const cameraLabel = cameraState === "requesting" ? tx(lang, "Requesting camera…", "正在请求摄像头…") : cameraState === "active" ? tx(lang, "Stop camera", "关闭摄像头") : tx(lang, "Use camera motion", "开启摄像头动作控制");
  return <div className={`movement-canvas camera-${cameraState}`} onPointerMove={trace} onPointerDown={(event) => { if ((event.target as HTMLElement).closest("button,input")) return; if (cameraState === "active") return; cursor.current.down = true; setEngaged(true); }} onPointerUp={() => { if (cameraState !== "active") cursor.current.down = false; }} onPointerCancel={() => { cursor.current.down = false; }} onPointerLeave={() => { if (cameraState !== "active") { cursor.current.active = false; cursor.current.down = false; } }}>
    <video ref={videoRef} className="camera-feed" muted playsInline aria-hidden="true" />
    <canvas ref={canvasRef} />
    <div className="camera-controls"><button onClick={cameraState === "active" ? stopCamera : startCamera} disabled={cameraState === "requesting"}><i />{cameraLabel}</button><span>{cameraState === "active" ? tx(lang, "Local motion tracking · video is not uploaded", "本地动作追踪 · 视频不会上传") : cameraState === "error" ? tx(lang, "Camera unavailable or permission denied", "摄像头不可用或未获授权") : tx(lang, "Optional · pointer and touch still work", "可选功能 · 仍可使用鼠标和触摸")}</span></div>
    <div className={`canvas-idle ${engaged ? "engaged" : ""}`}><span>{cameraState === "active" ? tx(lang, "MOVE IN FRAME TO CREATE", "在画面中移动以创作") : cursor.current.down ? tx(lang, "GATHERING MOVEMENT", "正在聚集动作") : tx(lang, "MOVE TO CREATE · HOLD TO GATHER", "移动以创作 · 按住以聚集")}</span><i /></div>
    <label>{tx(lang, "Movement intensity", "动作强度")} <output>{intensity}%</output><input type="range" min="20" max="100" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} /></label>
  </div>;
}

function DeviceControl({ lang }: { lang: Lang }) {
  const devices = lang === "zh" ? ["笔记本", "显示器", "平板"] : ["Laptop", "Display", "Tablet"]; const [active, setActive] = useState(0); const [confirmed, setConfirmed] = useState<number | null>(null); const startX = useRef(0);
  function switchTo(next: number) { setActive(next); setConfirmed(null); }
  function end(event: PointerEvent<HTMLDivElement>) { const delta = event.clientX - startX.current; if (Math.abs(delta) > 28) switchTo((active + (delta < 0 ? 1 : -1) + devices.length) % devices.length); }
  return <div className="device-demo" onPointerDown={(e) => { if ((e.target as HTMLElement).closest("button")) return; startX.current = e.clientX; }} onPointerUp={(e) => { if ((e.target as HTMLElement).closest("button")) return; end(e); }}><div className="control-instruction"><span>{tx(lang, "SWIPE", "挥动")}</span><i />{tx(lang, "MOVE FOCUS", "切换焦点")}<i /><span>{tx(lang, "PINCH", "捏合")}</span><i />{tx(lang, "CONFIRM", "确认")}</div><div className="device-row">{devices.map((name, index) => <div key={name} className={`device ${active === index ? "active" : ""} ${confirmed === index ? "confirmed" : ""} device-${index}`}><span className="device-screen"><i /><i /><i />{confirmed === index && <em>{tx(lang, "CONFIRMED", "已确认")} ✓</em>}</span><b>{name}</b></div>)}</div><div className="swipe-line"><button onClick={() => switchTo((active + 2) % 3)} aria-label="Previous device">←</button><span><i style={{ transform: `translateX(${active * 100}%)` }} /></span><button onClick={() => switchTo((active + 1) % 3)} aria-label="Next device">→</button></div><button className="confirm-gesture" onClick={() => setConfirmed(active)}><span className="pinch-icon"><i /><i /></span>{confirmed === active ? tx(lang, "Action confirmed", "操作已确认") : tx(lang, "Pinch to confirm", "捏合确认")}</button><p>{devices[active]} {tx(lang, "selected", "已选择")} <span>{confirmed === active ? tx(lang, "Command received", "已接收指令") : tx(lang, "Primary workspace", "当前工作区")}</span></p></div>;
}

function Waitlist({ lang }: { lang: Lang }) {
  const [email, setEmail] = useState(""); const [interest, setInterest] = useState("product"); const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle"); const [message, setMessage] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); setState("loading"); setMessage(""); try { const response = await fetch("/api/waitlist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, interest }) }); const data = await response.json() as { message?: string }; if (!response.ok) throw new Error(lang === "zh" ? "暂时无法保存，请重试。" : data.message || "Please try again."); setState("success"); setMessage(tx(lang, "You’re on the list. We’ll keep you close to what moves next.", "你已加入名单。我们会与你分享下一步进展。")); setEmail(""); } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : tx(lang, "Please try again.", "请重试。")); } }
  return <section className="waitlist" id="waitlist"><div className="waitlist-copy"><p className="section-index">05 / {tx(lang, "EARLY ACCESS", "抢先体验")}</p><h2>{tx(lang, "Be first to move.", "率先，开始移动。")}</h2><p>{tx(lang, "Join the AUX early access list from VAUX for product concepts, developer access, and updates from the edge of human interaction.", "加入 VAUX 的 AUX 抢先体验名单，获取产品概念、开发者资格与下一代人机交互进展。")}</p></div><form onSubmit={submit} noValidate><div className="interest-toggle" role="group" aria-label="Interest"><button type="button" className={interest === "product" ? "active" : ""} onClick={() => setInterest("product")}>{tx(lang, "Product", "产品")}</button><button type="button" className={interest === "developer" ? "active" : ""} onClick={() => setInterest("developer")}>{tx(lang, "Developer / Dev Kit", "开发者 / Dev Kit")}</button></div><label htmlFor="waitlist-email">{tx(lang, "Email address", "邮箱地址")}</label><div className="email-row"><input id="waitlist-email" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /><button disabled={state === "loading"}>{state === "loading" ? tx(lang, "Joining…", "正在加入…") : tx(lang, "Join waitlist", "加入名单")}<span>↗</span></button></div><p className={`form-message ${state}`} aria-live="polite">{message || tx(lang, "One email. No noise. Unsubscribe anytime.", "只发重要更新，随时可以取消订阅。")}</p></form></section>;
}
