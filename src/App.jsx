import { useState, useEffect, useRef } from "react";

// ─── DATOS INICIALES ────────────────────────────────────────────────────────
const PRODUCTOS_INIT = [
  { id: 1, nombre: "Concha", emoji: "🍞", categoria: "Clásico", precio: 12, costo: 4.5, stock: 48, ingredientes: [{ nombre: "Harina", cantidad: 80, unidad: "g" }, { nombre: "Azúcar", cantidad: 25, unidad: "g" }, { nombre: "Mantequilla", cantidad: 20, unidad: "g" }] },
  { id: 2, nombre: "Cuerno", emoji: "🥐", categoria: "Hojaldre", precio: 15, costo: 6, stock: 30, ingredientes: [{ nombre: "Harina", cantidad: 90, unidad: "g" }, { nombre: "Mantequilla", cantidad: 35, unidad: "g" }] },
  { id: 3, nombre: "Polvorón", emoji: "🍪", categoria: "Seco", precio: 8, costo: 2.5, stock: 60, ingredientes: [{ nombre: "Harina", cantidad: 60, unidad: "g" }, { nombre: "Azúcar", cantidad: 20, unidad: "g" }, { nombre: "Manteca", cantidad: 25, unidad: "g" }] },
  { id: 4, nombre: "Oreja", emoji: "🌀", categoria: "Hojaldre", precio: 14, costo: 5, stock: 40, ingredientes: [{ nombre: "Harina", cantidad: 85, unidad: "g" }, { nombre: "Azúcar", cantidad: 30, unidad: "g" }] },
  { id: 5, nombre: "Cupcake Chocolate", emoji: "🧁", categoria: "Pastelería", precio: 35, costo: 12, stock: 20, ingredientes: [{ nombre: "Harina", cantidad: 70, unidad: "g" }, { nombre: "Cacao", cantidad: 20, unidad: "g" }, { nombre: "Azúcar", cantidad: 40, unidad: "g" }] },
  { id: 6, nombre: "Pay de Limón", emoji: "🥧", categoria: "Pastelería", precio: 180, costo: 65, stock: 8, ingredientes: [{ nombre: "Harina", cantidad: 200, unidad: "g" }, { nombre: "Limón", cantidad: 4, unidad: "pz" }, { nombre: "Azúcar", cantidad: 120, unidad: "g" }] },
  { id: 7, nombre: "Dona Glaseada", emoji: "🍩", categoria: "Frito", precio: 18, costo: 6, stock: 25, ingredientes: [{ nombre: "Harina", cantidad: 90, unidad: "g" }, { nombre: "Azúcar", cantidad: 30, unidad: "g" }, { nombre: "Aceite", cantidad: 50, unidad: "ml" }] },
  { id: 8, nombre: "Pastel 3 Leches", emoji: "🎂", categoria: "Pastelería", precio: 450, costo: 150, stock: 4, ingredientes: [{ nombre: "Harina", cantidad: 300, unidad: "g" }, { nombre: "Leche", cantidad: 500, unidad: "ml" }, { nombre: "Azúcar", cantidad: 200, unidad: "g" }] },
  { id: 9, nombre: "Bolsa Chica", emoji: "🛍️", categoria: "Empaque", precio: 2, costo: 0.5, stock: 500, ingredientes: [] },
  { id: 10, nombre: "Bolsa Grande", emoji: "🛍️", categoria: "Empaque", precio: 4, costo: 1, stock: 300, ingredientes: [] },
  { id: 11, nombre: "Muffin Vainilla", emoji: "🫐", categoria: "Pastelería", precio: 28, costo: 9, stock: 18, ingredientes: [{ nombre: "Harina", cantidad: 80, unidad: "g" }, { nombre: "Vainilla", cantidad: 5, unidad: "ml" }, { nombre: "Azúcar", cantidad: 35, unidad: "g" }] },
  { id: 12, nombre: "Rosca de Nata", emoji: "🫓", categoria: "Clásico", precio: 20, costo: 7, stock: 22, ingredientes: [{ nombre: "Harina", cantidad: 100, unidad: "g" }, { nombre: "Nata", cantidad: 50, unidad: "g" }] },
];

const INSUMOS_INIT = [
  { id: 1, nombre: "Harina", unidad: "kg", stock: 25, stockMin: 5, costo: 18 },
  { id: 2, nombre: "Azúcar", unidad: "kg", stock: 12, stockMin: 3, costo: 22 },
  { id: 3, nombre: "Mantequilla", unidad: "kg", stock: 8, stockMin: 2, costo: 85 },
  { id: 4, nombre: "Manteca", unidad: "kg", stock: 6, stockMin: 2, costo: 42 },
  { id: 5, nombre: "Cacao en polvo", unidad: "kg", stock: 2, stockMin: 1, costo: 120 },
  { id: 6, nombre: "Vainilla", unidad: "L", stock: 1.5, stockMin: 0.5, costo: 180 },
  { id: 7, nombre: "Leche", unidad: "L", stock: 20, stockMin: 5, costo: 23 },
  { id: 8, nombre: "Aceite", unidad: "L", stock: 5, stockMin: 2, costo: 35 },
  { id: 9, nombre: "Limón", unidad: "kg", stock: 3, stockMin: 1, costo: 28 },
  { id: 10, nombre: "Nata", unidad: "kg", stock: 4, stockMin: 1, costo: 95 },
];

const CLIENTES_INIT = [
  { id: 1, nombre: "María González", telefono: "7771234567", email: "maria@mail.com", puntos: 240, totalCompras: 1850, visitas: 18 },
  { id: 2, nombre: "Carlos Reyes", telefono: "7779876543", email: "carlos@mail.com", puntos: 90, totalCompras: 680, visitas: 7 },
  { id: 3, nombre: "Ana Martínez", telefono: "7775551234", email: "ana@mail.com", puntos: 410, totalCompras: 3200, visitas: 32 },
  { id: 4, nombre: "Pedro López", telefono: "7773334444", email: "pedro@mail.com", puntos: 55, totalCompras: 420, visitas: 4 },
];

const PEDIDOS_INIT = [
  { id: 1, cliente: "María González", telefono: "7771234567", descripcion: "Pastel 3 Leches 2kg con decorado de flores", entrega: "2026-02-15", hora: "11:00", anticipo: 200, total: 450, estado: "pendiente", productos: [{ nombre: "Pastel 3 Leches", cantidad: 1, precio: 450 }] },
  { id: 2, cliente: "Jorge Pérez", telefono: "7778889999", descripcion: "24 Cupcakes de chocolate para XV años", entrega: "2026-02-14", hora: "09:00", anticipo: 420, total: 840, estado: "en_proceso", productos: [{ nombre: "Cupcake Chocolate", cantidad: 24, precio: 840 }] },
];

const VENTAS_HIST = [
  { fecha: "2026-02-11", total: 3420, tickets: 28 },
  { fecha: "2026-02-10", total: 2980, tickets: 24 },
  { fecha: "2026-02-09", total: 4150, tickets: 35 },
  { fecha: "2026-02-08", total: 2600, tickets: 21 },
  { fecha: "2026-02-07", total: 5200, tickets: 42 },
  { fecha: "2026-02-06", total: 4800, tickets: 39 },
  { fecha: "2026-02-05", total: 3100, tickets: 25 },
];

// ─── ESTILOS GLOBALES ────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0F0A05;--surface:#1A1108;--surface2:#251A0C;--surface3:#2E2010;
    --border:#3D2C18;--border2:#4A3820;
    --amber:#D4882A;--amber2:#F2A83B;--amber3:#FFC85A;
    --cream:#FAF0DC;--cream2:#F5E8C8;
    --text:#F0E4C8;--text2:#C4A882;--text3:#8A7055;
    --green:#4CAF50;--red:#EF5350;--blue:#42A5F5;--purple:#AB47BC;
    --success:#1B5E20;--successbg:#E8F5E9;
    --shadow:0 4px 24px rgba(0,0,0,0.4);
  }
  html,body,#root{height:100%;background:var(--bg);font-family:'DM Sans',sans-serif;color:var(--text)}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-track{background:var(--surface)}
  ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}
  input,select,textarea{background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;color:var(--text);padding:8px 12px;font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border 0.2s}
  input:focus,select:focus,textarea:focus{border-color:var(--amber)}
  button{cursor:pointer;font-family:'DM Sans',sans-serif}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
  @keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
  .fade-in{animation:fadeIn 0.35s ease both}
  .slide-in{animation:slideIn 0.3s ease both}
`;

// ─── UTILIDADES ──────────────────────────────────────────────────────────────
const fmt = (n) => `$${Number(n).toFixed(2)}`;
const fmtDate = (d) => new Date(d).toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
const today = () => new Date().toISOString().slice(0, 10);

// ─── COMPONENTES BASE ────────────────────────────────────────────────────────
const Badge = ({ children, color = "amber", size = "sm" }) => {
  const colors = {
    amber: "background:rgba(212,136,42,0.2);color:#F2A83B;border:1px solid rgba(212,136,42,0.3)",
    green: "background:rgba(76,175,80,0.2);color:#81C784;border:1px solid rgba(76,175,80,0.3)",
    red: "background:rgba(239,83,80,0.2);color:#EF9A9A;border:1px solid rgba(239,83,80,0.3)",
    blue: "background:rgba(66,165,245,0.2);color:#90CAF9;border:1px solid rgba(66,165,245,0.3)",
    purple: "background:rgba(171,71,188,0.2);color:#CE93D8;border:1px solid rgba(171,71,188,0.3)",
    gray: "background:rgba(255,255,255,0.08);color:#9E9E9E;border:1px solid rgba(255,255,255,0.1)",
  };
  return (
    <span style={{ display: "inline-block", padding: size === "sm" ? "2px 9px" : "4px 12px", borderRadius: 20, fontSize: size === "sm" ? 11 : 12, fontWeight: 600, letterSpacing: "0.5px", ...(Object.fromEntries(colors[color].split(";").map(s => { const [k, v] = s.split(":"); return [k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v?.trim()]; }).filter(([k]) => k))) }}>
      {children}
    </span>
  );
};

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: 20, ...style, cursor: onClick ? "pointer" : "default", transition: "border-color 0.2s, box-shadow 0.2s" }}
    onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = "var(--amber)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,136,42,0.15)"; } }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
    {children}
  </div>
);

const Btn = ({ children, onClick, variant = "primary", style = {}, disabled = false, size = "md" }) => {
  const variants = {
    primary: { background: "linear-gradient(135deg,#D4882A,#F2A83B)", color: "#1A0E06", border: "none" },
    secondary: { background: "var(--surface2)", color: "var(--text)", border: "1.5px solid var(--border)" },
    danger: { background: "rgba(239,83,80,0.15)", color: "#EF9A9A", border: "1.5px solid rgba(239,83,80,0.3)" },
    success: { background: "rgba(76,175,80,0.15)", color: "#81C784", border: "1.5px solid rgba(76,175,80,0.3)" },
    ghost: { background: "transparent", color: "var(--text2)", border: "none" },
  };
  const sizes = { sm: { padding: "5px 12px", fontSize: 12, borderRadius: 8 }, md: { padding: "9px 18px", fontSize: 13, borderRadius: 10 }, lg: { padding: "12px 24px", fontSize: 14, borderRadius: 12 } };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...variants[variant], ...sizes[size], fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "opacity 0.2s, transform 0.1s", ...style }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}>
      {children}
    </button>
  );
};

const StatCard = ({ icon, label, value, sub, color = "amber" }) => (
  <Card style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
    <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${color === "amber" ? "212,136,42" : color === "green" ? "76,175,80" : color === "blue" ? "66,165,245" : "171,71,188"},0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: "var(--cream)", lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{sub}</div>}
    </div>
  </Card>
);

// ─── MÓDULO: POS ─────────────────────────────────────────────────────────────
function ModuloPOS({ productos, clientes, onVenta }) {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [clienteSel, setClienteSel] = useState(null);
  const [descuento, setDescuento] = useState(0);
  const [vendido, setVendido] = useState(false);
  const [metodo, setMetodo] = useState("efectivo");
  const [pagoCon, setPagoCon] = useState("");

  const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];
  const filtrados = productos.filter(p =>
    (categoriaFiltro === "Todos" || p.categoria === categoriaFiltro) &&
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) && p.stock > 0
  );

  const addCarrito = (prod) => {
    setCarrito(prev => {
      const ex = prev.find(i => i.id === prod.id);
      if (ex) return prev.map(i => i.id === prod.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...prod, qty: 1 }];
    });
  };
  const updQty = (id, delta) => setCarrito(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  const subtotal = carrito.reduce((s, i) => s + i.precio * i.qty, 0);
  const descMonto = subtotal * (descuento / 100);
  const total = subtotal - descMonto;
  const cambio = pagoCon ? Math.max(0, parseFloat(pagoCon) - total) : 0;

  const cobrar = () => {
    if (!carrito.length) return;
    onVenta({ carrito, total, cliente: clienteSel, metodo, fecha: new Date().toISOString() });
    setVendido(true);
    setTimeout(() => { setVendido(false); setCarrito([]); setPagoCon(""); setDescuento(0); setClienteSel(null); }, 2200);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, height: "100%", minHeight: 0 }}>
      {/* Productos */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="🔍 Buscar producto..." style={{ flex: 1 }} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categorias.map(c => (
            <button key={c} onClick={() => setCategoriaFiltro(c)} style={{ padding: "5px 14px", borderRadius: 20, border: "1.5px solid", borderColor: categoriaFiltro === c ? "var(--amber)" : "var(--border)", background: categoriaFiltro === c ? "rgba(212,136,42,0.2)" : "transparent", color: categoriaFiltro === c ? "var(--amber2)" : "var(--text2)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10, overflowY: "auto", paddingRight: 4 }}>
          {filtrados.map(p => (
            <div key={p.id} onClick={() => addCarrito(p)} className="fade-in" style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 12, padding: "14px 12px", cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--amber)"; e.currentTarget.style.background = "var(--surface3)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface2)"; }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>{p.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--cream)", marginBottom: 3, lineHeight: 1.3 }}>{p.nombre}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: "var(--amber2)", fontWeight: 700 }}>{fmt(p.precio)}</div>
              <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 3 }}>Stock: {p.stock}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Carrito */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
        <Card style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minHeight: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700 }}>🛒 Ticket de Venta</span>
            {carrito.length > 0 && <Btn variant="ghost" size="sm" onClick={() => setCarrito([])}>Limpiar</Btn>}
          </div>

          {/* Cliente */}
          <select value={clienteSel?.id || ""} onChange={e => setClienteSel(clientes.find(c => c.id === parseInt(e.target.value)) || null)} style={{ width: "100%" }}>
            <option value="">👤 Cliente sin registro</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre} ({c.puntos}pts)</option>)}
          </select>

          {/* Items */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {carrito.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--text3)", padding: 30, fontSize: 13 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🥖</div>
                Agrega productos al ticket
              </div>
            ) : (
              carrito.map(item => (
                <div key={item.id} className="slide-in" style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 20 }}>{item.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{item.nombre}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{fmt(item.precio)} c/u</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => updQty(item.id, -1)} style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--border)", border: "none", color: "var(--text)", cursor: "pointer", fontSize: 14 }}>−</button>
                    <span style={{ minWidth: 20, textAlign: "center", fontSize: 13, fontWeight: 700 }}>{item.qty}</span>
                    <button onClick={() => updQty(item.id, 1)} style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--amber)", border: "none", color: "#1A0E06", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>+</button>
                  </div>
                  <div style={{ minWidth: 52, textAlign: "right", fontSize: 13, fontWeight: 600, color: "var(--amber2)" }}>{fmt(item.precio * item.qty)}</div>
                </div>
              ))
            )}
          </div>

          {/* Totales */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text2)" }}>
              <span>Subtotal</span><span>{fmt(subtotal)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "var(--text2)", flex: 1 }}>Descuento %</span>
              <input type="number" min="0" max="50" value={descuento} onChange={e => setDescuento(Number(e.target.value))} style={{ width: 60, textAlign: "center" }} />
              {descuento > 0 && <span style={{ fontSize: 12, color: "#EF9A9A" }}>-{fmt(descMonto)}</span>}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "var(--amber3)" }}>
              <span>TOTAL</span><span>{fmt(total)}</span>
            </div>

            {/* Método pago */}
            <div style={{ display: "flex", gap: 6 }}>
              {["efectivo", "tarjeta", "transferencia"].map(m => (
                <button key={m} onClick={() => setMetodo(m)} style={{ flex: 1, padding: "6px 4px", borderRadius: 8, border: "1.5px solid", borderColor: metodo === m ? "var(--amber)" : "var(--border)", background: metodo === m ? "rgba(212,136,42,0.15)" : "transparent", color: metodo === m ? "var(--amber2)" : "var(--text3)", fontSize: 10, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
                  {m === "efectivo" ? "💵" : m === "tarjeta" ? "💳" : "📲"} {m}
                </button>
              ))}
            </div>

            {metodo === "efectivo" && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="number" placeholder="Pago con..." value={pagoCon} onChange={e => setPagoCon(e.target.value)} style={{ flex: 1 }} />
                {pagoCon && <span style={{ fontSize: 12, color: "var(--green)", fontWeight: 600, whiteSpace: "nowrap" }}>Cambio: {fmt(cambio)}</span>}
              </div>
            )}

            <Btn variant={vendido ? "success" : "primary"} size="lg" style={{ width: "100%", marginTop: 4, fontSize: 15 }} onClick={cobrar} disabled={!carrito.length}>
              {vendido ? "✅ ¡Cobrado!" : `💰 Cobrar ${fmt(total)}`}
            </Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── MÓDULO: INVENTARIO ───────────────────────────────────────────────────────
function ModuloInventario({ insumos, setInsumos }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const alertas = insumos.filter(i => i.stock <= i.stockMin);

  const guardar = () => {
    if (modal === "edit") setInsumos(prev => prev.map(i => i.id === form.id ? form : i));
    else setInsumos(prev => [...prev, { ...form, id: Date.now() }]);
    setModal(null);
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {alertas.length > 0 && (
        <div style={{ background: "rgba(239,83,80,0.1)", border: "1.5px solid rgba(239,83,80,0.3)", borderRadius: 12, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#EF9A9A" }}>Insumos con stock bajo</div>
            <div style={{ fontSize: 12, color: "var(--text2)" }}>{alertas.map(a => a.nombre).join(", ")}</div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20 }}>📦 Inventario de Insumos</h3>
        <Btn onClick={() => { setForm({ nombre: "", unidad: "kg", stock: 0, stockMin: 1, costo: 0 }); setModal("new"); }}>+ Agregar insumo</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
        {insumos.map(ins => {
          const pct = Math.min(100, (ins.stock / (ins.stockMin * 3)) * 100);
          const bajo = ins.stock <= ins.stockMin;
          return (
            <Card key={ins.id} style={{ cursor: "default" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{ins.nombre}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{fmt(ins.costo)}/{ins.unidad}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: bajo ? "#EF9A9A" : "var(--amber2)" }}>{ins.stock}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>{ins.unidad}</div>
                </div>
              </div>
              <div style={{ background: "var(--border)", borderRadius: 4, height: 6, marginBottom: 8, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: bajo ? "var(--red)" : "linear-gradient(90deg,var(--amber),var(--amber2))", borderRadius: 4, transition: "width 0.5s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "var(--text3)" }}>Mín: {ins.stockMin} {ins.unidad}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  {bajo && <Badge color="red">Stock bajo</Badge>}
                  <Btn size="sm" variant="secondary" onClick={() => { setForm({ ...ins }); setModal("edit"); }}>Editar</Btn>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <Card style={{ width: 380, padding: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: 20 }}>{modal === "edit" ? "Editar Insumo" : "Nuevo Insumo"}</h3>
            {[["nombre", "Nombre", "text"], ["unidad", "Unidad (kg, L, pz)", "text"], ["stock", "Stock actual", "number"], ["stockMin", "Stock mínimo", "number"], ["costo", "Costo por unidad", "number"]].map(([k, label, type]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 4 }}>{label}</label>
                <input type={type} value={form[k] || ""} onChange={e => setForm(p => ({ ...p, [k]: type === "number" ? parseFloat(e.target.value) : e.target.value }))} style={{ width: "100%" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Btn style={{ flex: 1 }} onClick={guardar}>Guardar</Btn>
              <Btn variant="secondary" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancelar</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── MÓDULO: CATÁLOGO ─────────────────────────────────────────────────────────
function ModuloCatalogo({ productos, setProductos }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const [busqueda, setBusqueda] = useState("");

  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  const margen = (p) => (((p.precio - p.costo) / p.precio) * 100).toFixed(0);

  const guardar = () => {
    if (form.id) setProductos(prev => prev.map(p => p.id === form.id ? form : p));
    else setProductos(prev => [...prev, { ...form, id: Date.now(), ingredientes: [] }]);
    setModal(false);
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20 }}>🗂️ Catálogo de Productos</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar..." style={{ width: 180 }} />
          <Btn onClick={() => { setForm({ nombre: "", emoji: "🍞", categoria: "Clásico", precio: 0, costo: 0, stock: 0 }); setModal(true); }}>+ Nuevo producto</Btn>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--surface2)" }}>
              {["", "Nombre", "Categoría", "Precio", "Costo", "Margen", "Stock", ""].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "var(--text3)", fontWeight: 600, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", borderBottom: "1.5px solid var(--border)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p, i) => (
              <tr key={p.id} className="slide-in" style={{ borderBottom: "1px solid var(--border)", animationDelay: `${i * 0.03}s`, transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "10px 14px", fontSize: 24 }}>{p.emoji}</td>
                <td style={{ padding: "10px 14px", fontWeight: 600 }}>{p.nombre}</td>
                <td style={{ padding: "10px 14px" }}><Badge color="amber">{p.categoria}</Badge></td>
                <td style={{ padding: "10px 14px", color: "var(--amber2)", fontWeight: 700 }}>{fmt(p.precio)}</td>
                <td style={{ padding: "10px 14px", color: "var(--text2)" }}>{fmt(p.costo)}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ color: parseInt(margen(p)) > 50 ? "#81C784" : parseInt(margen(p)) > 30 ? "var(--amber2)" : "#EF9A9A", fontWeight: 700 }}>{margen(p)}%</span>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ color: p.stock < 10 ? "#EF9A9A" : "var(--text)" }}>{p.stock}</span>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <Btn size="sm" variant="secondary" onClick={() => { setForm({ ...p }); setModal(true); }}>Editar</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <Card style={{ width: 420, padding: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: 20 }}>{form.id ? "Editar Producto" : "Nuevo Producto"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["nombre", "Nombre", "text", "100%"], ["emoji", "Emoji", "text", "auto"], ["categoria", "Categoría", "text", "100%"], ["precio", "Precio de venta", "number", "auto"], ["costo", "Costo de producción", "number", "auto"], ["stock", "Stock inicial", "number", "auto"]].map(([k, label, type]) => (
                <div key={k}>
                  <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 4 }}>{label}</label>
                  <input type={type} value={form[k] || ""} onChange={e => setForm(p => ({ ...p, [k]: type === "number" ? parseFloat(e.target.value) : e.target.value }))} style={{ width: "100%" }} />
                </div>
              ))}
            </div>
            {form.precio && form.costo && (
              <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "10px 14px", marginTop: 12, fontSize: 13 }}>
                Margen estimado: <strong style={{ color: "var(--amber2)" }}>{(((form.precio - form.costo) / form.precio) * 100).toFixed(1)}%</strong> · Ganancia: <strong style={{ color: "#81C784" }}>{fmt(form.precio - form.costo)}</strong>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Btn style={{ flex: 1 }} onClick={guardar}>Guardar</Btn>
              <Btn variant="secondary" style={{ flex: 1 }} onClick={() => setModal(false)}>Cancelar</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── MÓDULO: PEDIDOS ESPECIALES ───────────────────────────────────────────────
function ModuloPedidos({ pedidos, setPedidos, productos }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ cliente: "", telefono: "", descripcion: "", entrega: "", hora: "10:00", anticipo: 0, total: 0, estado: "pendiente", productos: [] });
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const estados = { pendiente: { label: "Pendiente", color: "amber" }, en_proceso: { label: "En proceso", color: "blue" }, listo: { label: "Listo", color: "green" }, entregado: { label: "Entregado", color: "gray" } };
  const filtrados = pedidos.filter(p => filtroEstado === "todos" || p.estado === filtroEstado);

  const guardar = () => {
    if (form.id) setPedidos(prev => prev.map(p => p.id === form.id ? form : p));
    else setPedidos(prev => [...prev, { ...form, id: Date.now() }]);
    setModal(false);
  };

  const cambiarEstado = (id, nuevoEstado) => setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20 }}>🎂 Pedidos Especiales</h3>
        <Btn onClick={() => { setForm({ cliente: "", telefono: "", descripcion: "", entrega: today(), hora: "10:00", anticipo: 0, total: 0, estado: "pendiente", productos: [] }); setModal(true); }}>+ Nuevo pedido</Btn>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[["todos", "Todos"], ...Object.entries(estados).map(([k, v]) => [k, v.label])].map(([k, label]) => (
          <button key={k} onClick={() => setFiltroEstado(k)} style={{ padding: "5px 14px", borderRadius: 20, border: "1.5px solid", borderColor: filtroEstado === k ? "var(--amber)" : "var(--border)", background: filtroEstado === k ? "rgba(212,136,42,0.2)" : "transparent", color: filtroEstado === k ? "var(--amber2)" : "var(--text2)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {label} {k !== "todos" && <span style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "0 6px", marginLeft: 2 }}>{pedidos.filter(p => p.estado === k).length}</span>}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 14 }}>
        {filtrados.map(pedido => {
          const restante = pedido.total - pedido.anticipo;
          const est = estados[pedido.estado];
          return (
            <Card key={pedido.id} style={{ cursor: "default" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{pedido.cliente}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>📱 {pedido.telefono}</div>
                </div>
                <Badge color={est.color}>{est.label}</Badge>
              </div>

              <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "10px 12px", marginBottom: 12, fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>
                {pedido.descripcion}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "8px 12px" }}>
                  <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1 }}>Entrega</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>📅 {fmtDate(pedido.entrega)} · {pedido.hora}</div>
                </div>
                <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "8px 12px" }}>
                  <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1 }}>Financiero</div>
                  <div style={{ fontSize: 13 }}>Total: <strong style={{ color: "var(--amber2)" }}>{fmt(pedido.total)}</strong></div>
                  <div style={{ fontSize: 11, color: restante > 0 ? "#EF9A9A" : "#81C784" }}>
                    {restante > 0 ? `Falta: ${fmt(restante)}` : "✅ Liquidado"}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {Object.keys(estados).filter(k => k !== pedido.estado).slice(0, 2).map(k => (
                    <Btn key={k} size="sm" variant="secondary" onClick={() => cambiarEstado(pedido.id, k)} style={{ fontSize: 11 }}>
                      → {estados[k].label}
                    </Btn>
                  ))}
                </div>
                <Btn size="sm" variant="ghost" onClick={() => { setForm({ ...pedido }); setModal(true); }}>✏️ Editar</Btn>
              </div>
            </Card>
          );
        })}
      </div>

      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <Card style={{ width: 480, padding: 28, maxHeight: "85vh", overflowY: "auto" }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: 20 }}>🎂 {form.id ? "Editar Pedido" : "Nuevo Pedido Especial"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["cliente", "Nombre del cliente", "text"], ["telefono", "Teléfono", "tel"], ["entrega", "Fecha de entrega", "date"], ["hora", "Hora de entrega", "time"], ["total", "Total del pedido ($)", "number"], ["anticipo", "Anticipo recibido ($)", "number"]].map(([k, label, type]) => (
                <div key={k}>
                  <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 4 }}>{label}</label>
                  <input type={type} value={form[k] || ""} onChange={e => setForm(p => ({ ...p, [k]: ["total", "anticipo"].includes(k) ? parseFloat(e.target.value) : e.target.value }))} style={{ width: "100%" }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 4 }}>Descripción del pedido</label>
              <textarea value={form.descripcion || ""} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} rows={3} style={{ width: "100%", resize: "vertical" }} />
            </div>
            {form.total && form.anticipo !== undefined && (
              <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "10px 14px", marginTop: 12, fontSize: 13 }}>
                Anticipo: <strong style={{ color: "var(--amber2)" }}>{fmt(form.anticipo)}</strong> · Resta al entregar: <strong style={{ color: form.total - form.anticipo > 0 ? "#EF9A9A" : "#81C784" }}>{fmt(form.total - form.anticipo)}</strong>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Btn style={{ flex: 1 }} onClick={guardar}>Guardar pedido</Btn>
              <Btn variant="secondary" style={{ flex: 1 }} onClick={() => setModal(false)}>Cancelar</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── MÓDULO: REPORTES ─────────────────────────────────────────────────────────
function ModuloReportes({ ventas, productos }) {
  const totalHoy = ventas[0]?.total || 0;
  const totalSemana = ventas.reduce((s, v) => s + v.total, 0);
  const ticketsHoy = ventas[0]?.tickets || 0;
  const promedioTicket = ventas.length ? (totalSemana / ventas.reduce((s, v) => s + v.tickets, 0)).toFixed(2) : 0;
  const maxVenta = Math.max(...ventas.map(v => v.total));

  const topProductos = productos.slice().sort((a, b) => b.precio * (50 - b.stock) - a.precio * (50 - a.stock)).slice(0, 5);

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20 }}>📊 Reportes de Ventas</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        <StatCard icon="💰" label="Ventas Hoy" value={fmt(totalHoy)} sub={`${ticketsHoy} tickets`} color="amber" />
        <StatCard icon="📈" label="Ventas 7 días" value={fmt(totalSemana)} sub="Esta semana" color="green" />
        <StatCard icon="🧾" label="Ticket Promedio" value={fmt(promedioTicket)} sub="Por cliente" color="blue" />
        <StatCard icon="📦" label="Productos activos" value={productos.length} sub="En catálogo" color="purple" />
      </div>

      {/* Gráfica de barras */}
      <Card>
        <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Ventas por día — últimos 7 días</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
          {ventas.map((v, i) => {
            const pct = (v.total / maxVenta) * 100;
            const isToday = i === 0;
            return (
              <div key={v.fecha} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 11, color: "var(--text3)", fontWeight: 600 }}>{fmt(v.total)}</div>
                <div style={{ width: "100%", height: `${pct}%`, background: isToday ? "linear-gradient(180deg,var(--amber3),var(--amber))" : "linear-gradient(180deg,var(--surface3),var(--surface2))", borderRadius: "6px 6px 0 0", border: `1px solid ${isToday ? "var(--amber)" : "var(--border)"}`, minHeight: 8, transition: "height 0.6s ease" }} />
                <div style={{ fontSize: 10, color: isToday ? "var(--amber2)" : "var(--text3)", fontWeight: isToday ? 700 : 400 }}>{fmtDate(v.fecha)}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Top productos */}
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 14 }}>🏆 Top Productos</div>
          {topProductos.map((p, i) => {
            const ingreso = p.precio * Math.max(5, 50 - p.stock);
            const maxIng = topProductos[0].precio * Math.max(5, 50 - topProductos[0].stock);
            return (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{p.nombre}</span>
                    <span style={{ fontSize: 12, color: "var(--amber2)" }}>{fmt(ingreso)}</span>
                  </div>
                  <div style={{ background: "var(--border)", borderRadius: 3, height: 5 }}>
                    <div style={{ width: `${(ingreso / maxIng) * 100}%`, height: "100%", background: `hsl(${38 - i * 6},80%,${60 - i * 5}%)`, borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </Card>

        {/* Análisis margen */}
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 14 }}>💹 Margen por Producto</div>
          {productos.slice(0, 6).map(p => {
            const m = ((p.precio - p.costo) / p.precio) * 100;
            return (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
                <span style={{ fontSize: 16 }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontSize: 11, fontWeight: 600 }}>{p.nombre}</span>
                    <span style={{ fontSize: 11, color: m > 60 ? "#81C784" : m > 40 ? "var(--amber2)" : "#EF9A9A", fontWeight: 700 }}>{m.toFixed(0)}%</span>
                  </div>
                  <div style={{ background: "var(--border)", borderRadius: 3, height: 4 }}>
                    <div style={{ width: `${m}%`, height: "100%", background: m > 60 ? "var(--green)" : m > 40 ? "var(--amber)" : "var(--red)", borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

// ─── MÓDULO: CAJA ─────────────────────────────────────────────────────────────
function ModuloCaja({ ventas }) {
  const [cajaAbierta, setCajaAbierta] = useState(true);
  const [fondoInicial, setFondoInicial] = useState(500);
  const [cajaInput, setCajaInput] = useState("500");

  const ventasHoy = ventas[0] || { total: 0, tickets: 0 };
  const efectivoEstimado = fondoInicial + (ventasHoy.total * 0.6);
  const tarjetaEstimado = ventasHoy.total * 0.3;
  const transEstimado = ventasHoy.total * 0.1;

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20 }}>💵 Control de Caja</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: cajaAbierta ? "var(--green)" : "var(--red)", boxShadow: `0 0 8px ${cajaAbierta ? "var(--green)" : "var(--red)"}` }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: cajaAbierta ? "#81C784" : "#EF9A9A" }}>{cajaAbierta ? "Caja abierta" : "Caja cerrada"}</span>
          <Btn variant={cajaAbierta ? "danger" : "success"} onClick={() => setCajaAbierta(p => !p)}>
            {cajaAbierta ? "Cerrar caja" : "Abrir caja"}
          </Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Apertura de caja</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Fondo inicial en efectivo</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="number" value={cajaInput} onChange={e => setCajaInput(e.target.value)} style={{ flex: 1 }} />
              <Btn onClick={() => setFondoInicial(parseFloat(cajaInput) || 0)}>Confirmar</Btn>
            </div>
          </div>
          <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 4 }}>Fondo confirmado</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "var(--amber2)", fontWeight: 700 }}>{fmt(fondoInicial)}</div>
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Ventas del día</div>
          {[
            ["💵 Efectivo", fmt(efectivoEstimado), "amber"],
            ["💳 Tarjeta", fmt(tarjetaEstimado), "blue"],
            ["📲 Transferencia", fmt(transEstimado), "green"],
          ].map(([label, val, col]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 13 }}>{label}</span>
              <span style={{ fontWeight: 700, color: `var(--${col === "amber" ? "amber2" : col === "blue" ? "blue" : "green"})` }}>{val}</span>
            </div>
          ))}
        </Card>
      </div>

      <Card>
        <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>📋 Resumen del corte de caja</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            { label: "Fondo inicial", value: fmt(fondoInicial), icon: "🏦" },
            { label: "Total ventas", value: fmt(ventasHoy.total), icon: "📈" },
            { label: "Tickets emitidos", value: ventasHoy.tickets, icon: "🧾" },
            { label: "Venta efectivo", value: fmt(efectivoEstimado - fondoInicial), icon: "💵" },
            { label: "Efectivo en caja", value: fmt(efectivoEstimado), icon: "💰" },
            { label: "Ticket promedio", value: fmt(ventasHoy.tickets ? ventasHoy.total / ventasHoy.tickets : 0), icon: "📊" },
          ].map(item => (
            <div key={item.label} style={{ background: "var(--surface2)", borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: "var(--cream)" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── MÓDULO: CLIENTES ─────────────────────────────────────────────────────────
function ModuloClientes({ clientes, setClientes }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const [busqueda, setBusqueda] = useState("");

  const filtrados = clientes.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.telefono.includes(busqueda));
  const nivel = (puntos) => puntos >= 300 ? "🥇 Oro" : puntos >= 100 ? "🥈 Plata" : "🥉 Bronce";
  const nivelColor = (puntos) => puntos >= 300 ? "amber" : puntos >= 100 ? "blue" : "gray";

  const guardar = () => {
    if (form.id) setClientes(prev => prev.map(c => c.id === form.id ? form : c));
    else setClientes(prev => [...prev, { ...form, id: Date.now(), puntos: 0, totalCompras: 0, visitas: 0 }]);
    setModal(false);
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20 }}>👥 Clientes y Fidelización</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar cliente..." style={{ width: 200 }} />
          <Btn onClick={() => { setForm({ nombre: "", telefono: "", email: "" }); setModal(true); }}>+ Nuevo cliente</Btn>
        </div>
      </div>

      {/* Stats fidelización */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        <StatCard icon="🥇" label="Clientes Oro" value={clientes.filter(c => c.puntos >= 300).length} sub="+300 puntos" color="amber" />
        <StatCard icon="🥈" label="Clientes Plata" value={clientes.filter(c => c.puntos >= 100 && c.puntos < 300).length} sub="100-299 puntos" color="blue" />
        <StatCard icon="⭐" label="Puntos otorgados" value={clientes.reduce((s, c) => s + c.puntos, 0)} sub="Total acumulado" color="green" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12 }}>
        {filtrados.map(c => (
          <Card key={c.id} style={{ cursor: "default" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,var(--amber),var(--amber2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#1A0E06" }}>
                  {c.nombre.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{c.nombre}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>📱 {c.telefono}</div>
                </div>
              </div>
              <Badge color={nivelColor(c.puntos)}>{nivel(c.puntos)}</Badge>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              {[["⭐", "Puntos", c.puntos], ["💰", "Total", fmt(c.totalCompras)], ["🛒", "Visitas", c.visitas]].map(([icon, lbl, val]) => (
                <div key={lbl} style={{ background: "var(--surface2)", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 16 }}>{icon}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)", margin: "2px 0" }}>{lbl}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--cream)" }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Barra de progreso al siguiente nivel */}
            {c.puntos < 300 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>
                  <span>Progreso al siguiente nivel</span>
                  <span>{c.puntos < 100 ? `${100 - c.puntos} pts para Plata` : `${300 - c.puntos} pts para Oro`}</span>
                </div>
                <div style={{ background: "var(--border)", borderRadius: 4, height: 5 }}>
                  <div style={{ width: `${c.puntos < 100 ? (c.puntos / 100) * 100 : ((c.puntos - 100) / 200) * 100}%`, height: "100%", background: "linear-gradient(90deg,var(--amber),var(--amber3))", borderRadius: 4 }} />
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Btn size="sm" variant="secondary" onClick={() => setClientes(prev => prev.map(cl => cl.id === c.id ? { ...cl, puntos: cl.puntos + 10 } : cl))}>+10 pts</Btn>
              <Btn size="sm" variant="ghost" onClick={() => { setForm({ ...c }); setModal(true); }}>✏️ Editar</Btn>
            </div>
          </Card>
        ))}
      </div>

      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <Card style={{ width: 380, padding: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: 20 }}>👤 {form.id ? "Editar cliente" : "Nuevo cliente"}</h3>
            {[["nombre", "Nombre completo", "text"], ["telefono", "Teléfono", "tel"], ["email", "Correo electrónico", "email"]].map(([k, label, type]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 4 }}>{label}</label>
                <input type={type} value={form[k] || ""} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} style={{ width: "100%" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Btn style={{ flex: 1 }} onClick={guardar}>Guardar</Btn>
              <Btn variant="secondary" style={{ flex: 1 }} onClick={() => setModal(false)}>Cancelar</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── MÓDULO: RECETAS ──────────────────────────────────────────────────────────
function ModuloRecetas({ productos, insumos }) {
  const [selProd, setSelProd] = useState(productos[0]);

  const costoReceta = selProd ? selProd.ingredientes.reduce((s, ing) => {
    const ins = insumos.find(i => i.nombre === ing.nombre);
    if (!ins) return s;
    const factor = ing.unidad === "kg" || ing.unidad === "L" ? ing.cantidad / 1000 : ing.cantidad;
    return s + (ins.costo * factor);
  }, 0) : 0;

  const margenReal = selProd ? (((selProd.precio - costoReceta) / selProd.precio) * 100).toFixed(1) : 0;

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20 }}>📖 Recetas y Costeo</h3>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
        {/* Lista de productos */}
        <Card style={{ padding: 12 }}>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Productos con receta</div>
          {productos.filter(p => p.ingredientes.length > 0).map(p => (
            <div key={p.id} onClick={() => setSelProd(p)} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 12px", borderRadius: 10, cursor: "pointer", background: selProd?.id === p.id ? "rgba(212,136,42,0.15)" : "transparent", border: `1.5px solid ${selProd?.id === p.id ? "var(--amber)" : "transparent"}`, marginBottom: 4, transition: "all 0.2s" }}>
              <span style={{ fontSize: 22 }}>{p.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.nombre}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{p.ingredientes.length} insumos</div>
              </div>
            </div>
          ))}
        </Card>

        {/* Detalle receta */}
        {selProd && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card>
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 48 }}>{selProd.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700 }}>{selProd.nombre}</div>
                  <Badge color="amber">{selProd.categoria}</Badge>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
                {[
                  { label: "Precio venta", value: fmt(selProd.precio), color: "var(--amber2)" },
                  { label: "Costo real", value: fmt(costoReceta), color: "#EF9A9A" },
                  { label: "Ganancia", value: fmt(selProd.precio - costoReceta), color: "#81C784" },
                ].map(item => (
                  <div key={item.label} style={{ background: "var(--surface2)", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Barra margen */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>Margen de ganancia</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: parseFloat(margenReal) > 60 ? "#81C784" : parseFloat(margenReal) > 40 ? "var(--amber2)" : "#EF9A9A" }}>{margenReal}%</span>
                </div>
                <div style={{ background: "var(--border)", borderRadius: 6, height: 10 }}>
                  <div style={{ width: `${margenReal}%`, height: "100%", background: `linear-gradient(90deg,${parseFloat(margenReal) > 60 ? "var(--green)" : parseFloat(margenReal) > 40 ? "var(--amber)" : "var(--red)"},transparent)`, borderRadius: 6, transition: "width 0.6s" }} />
                </div>
              </div>

              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>📋 Ingredientes por pieza:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {selProd.ingredientes.map((ing, i) => {
                  const ins = insumos.find(x => x.nombre === ing.nombre);
                  const factor = ing.unidad === "g" || ing.unidad === "ml" ? ing.cantidad / 1000 : ing.cantidad;
                  const costoIng = ins ? ins.costo * factor : 0;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--surface2)", borderRadius: 8, padding: "9px 14px" }}>
                      <span style={{ fontSize: 18 }}>🌾</span>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{ing.nombre}</span>
                      <Badge color="gray">{ing.cantidad} {ing.unidad}</Badge>
                      <span style={{ fontSize: 12, color: "#EF9A9A", minWidth: 60, textAlign: "right" }}>{fmt(costoIng)}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ─────────────────────────────────────────────────────────────
const MODULOS = [
  { id: "pos", icon: "🖥️", label: "POS", sub: "Punto de venta" },
  { id: "inventario", icon: "📦", label: "Inventario", sub: "Insumos" },
  { id: "catalogo", icon: "🗂️", label: "Catálogo", sub: "Productos" },
  { id: "pedidos", icon: "🎂", label: "Pedidos", sub: "Especiales" },
  { id: "reportes", icon: "📊", label: "Reportes", sub: "Ventas" },
  { id: "caja", icon: "💵", label: "Caja", sub: "Corte" },
  { id: "clientes", icon: "👥", label: "Clientes", sub: "Fidelización" },
  { id: "recetas", icon: "📖", label: "Recetas", sub: "Costeo" },
];

export default function App() {
  const [modulo, setModulo] = useState("pos");
  const [productos, setProductos] = useState(PRODUCTOS_INIT);
  const [insumos, setInsumos] = useState(INSUMOS_INIT);
  const [clientes, setClientes] = useState(CLIENTES_INIT);
  const [pedidos, setPedidos] = useState(PEDIDOS_INIT);
  const [ventas, setVentas] = useState(VENTAS_HIST);
  const [notif, setNotif] = useState(null);

  const handleVenta = ({ carrito, total, cliente, metodo }) => {
    setVentas(prev => {
      const nueva = [...prev];
      nueva[0] = { ...nueva[0], total: nueva[0].total + total, tickets: nueva[0].tickets + 1 };
      return nueva;
    });
    if (cliente) setClientes(prev => prev.map(c => c.id === cliente.id ? { ...c, puntos: c.puntos + Math.floor(total / 10), totalCompras: c.totalCompras + total, visitas: c.visitas + 1 } : c));
    carrito.forEach(item => setProductos(prev => prev.map(p => p.id === item.id ? { ...p, stock: Math.max(0, p.stock - item.qty) } : p)));
    setNotif(`✅ Venta de ${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(total)} registrada`);
    setTimeout(() => setNotif(null), 3000);
  };

  const alertasBajoStock = insumos.filter(i => i.stock <= i.stockMin).length;
  const pedidosHoy = pedidos.filter(p => p.entrega === today()).length;

  return (
    <>
      <style>{css}</style>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

        {/* SIDEBAR */}
        <nav style={{ width: 200, background: "var(--surface)", borderRight: "1.5px solid var(--border)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          {/* Logo */}
          <div style={{ padding: "22px 18px 16px", borderBottom: "1.5px solid var(--border)" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 900, color: "var(--amber2)", lineHeight: 1.1 }}>🥐 PanSoft</div>
            <div style={{ fontSize: 10, color: "var(--text3)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>Sistema de Panadería</div>
          </div>

          {/* Menú */}
          <div style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
            {MODULOS.map(m => (
              <button key={m.id} onClick={() => setModulo(m.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", background: modulo === m.id ? "rgba(212,136,42,0.15)" : "transparent", color: modulo === m.id ? "var(--amber2)" : "var(--text2)", cursor: "pointer", marginBottom: 2, textAlign: "left", transition: "all 0.2s", position: "relative" }}
                onMouseEnter={e => { if (modulo !== m.id) e.currentTarget.style.background = "var(--surface2)"; }}
                onMouseLeave={e => { if (modulo !== m.id) e.currentTarget.style.background = "transparent"; }}>
                {modulo === m.id && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 22, background: "var(--amber)", borderRadius: "0 3px 3px 0" }} />}
                <span style={{ fontSize: 18 }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: modulo === m.id ? 700 : 500 }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)" }}>{m.sub}</div>
                </div>
                {m.id === "inventario" && alertasBajoStock > 0 && (
                  <span style={{ marginLeft: "auto", background: "var(--red)", color: "white", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{alertasBajoStock}</span>
                )}
                {m.id === "pedidos" && pedidosHoy > 0 && (
                  <span style={{ marginLeft: "auto", background: "var(--amber)", color: "#1A0E06", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{pedidosHoy}</span>
                )}
              </button>
            ))}
          </div>

          {/* User footer */}
          <div style={{ padding: "14px 16px", borderTop: "1.5px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,var(--amber),var(--amber2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👩‍🍳</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Administrador</div>
                <div style={{ fontSize: 10, color: "var(--text3)" }}>Panadería Esperanza</div>
              </div>
            </div>
          </div>
        </nav>

        {/* MAIN */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Top bar */}
          <header style={{ background: "var(--surface)", borderBottom: "1.5px solid var(--border)", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700 }}>
                {MODULOS.find(m => m.id === modulo)?.icon} {MODULOS.find(m => m.id === modulo)?.label}
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)" }}>{new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {alertasBajoStock > 0 && <Badge color="red">⚠️ {alertasBajoStock} insumos bajos</Badge>}
              {pedidosHoy > 0 && <Badge color="amber">🎂 {pedidosHoy} entrega(s) hoy</Badge>}
              <div style={{ fontSize: 13, color: "var(--text3)" }}>Ventas hoy: <strong style={{ color: "var(--amber2)" }}>{fmt(ventas[0]?.total || 0)}</strong></div>
            </div>
          </header>

          {/* Contenido del módulo */}
          <div style={{ flex: 1, overflow: "auto", padding: modulo === "pos" ? "16px 20px" : "20px 24px" }}>
            {modulo === "pos" && <ModuloPOS productos={productos} clientes={clientes} onVenta={handleVenta} />}
            {modulo === "inventario" && <ModuloInventario insumos={insumos} setInsumos={setInsumos} />}
            {modulo === "catalogo" && <ModuloCatalogo productos={productos} setProductos={setProductos} />}
            {modulo === "pedidos" && <ModuloPedidos pedidos={pedidos} setPedidos={setPedidos} productos={productos} />}
            {modulo === "reportes" && <ModuloReportes ventas={ventas} productos={productos} />}
            {modulo === "caja" && <ModuloCaja ventas={ventas} />}
            {modulo === "clientes" && <ModuloClientes clientes={clientes} setClientes={setClientes} />}
            {modulo === "recetas" && <ModuloRecetas productos={productos} insumos={insumos} />}
          </div>
        </main>
      </div>

      {/* Notificación toast */}
      {notif && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--surface)", border: "1.5px solid var(--amber)", borderRadius: 12, padding: "12px 20px", fontSize: 13, fontWeight: 600, color: "var(--amber2)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", zIndex: 999, animation: "fadeIn 0.3s ease" }}>
          {notif}
        </div>
      )}
    </>
  );
}
