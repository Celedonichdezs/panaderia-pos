// src/useData.js
// ─────────────────────────────────────────────────────────────
//  Hook central que maneja TODOS los datos desde Supabase.
//  Reemplaza los useState locales del App.jsx original.
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'

export function useData() {
  const [productos,  setProductos]  = useState([])
  const [insumos,    setInsumos]    = useState([])
  const [clientes,   setClientes]   = useState([])
  const [pedidos,    setPedidos]    = useState([])
  const [ventas,     setVentas]     = useState([])
  const [cargando,   setCargando]   = useState(true)
  const [error,      setError]      = useState(null)

  // ── CARGA INICIAL ──────────────────────────────────────────
  const cargarTodo = useCallback(async () => {
    setCargando(true)
    setError(null)
    try {
      const [
        { data: prods,  error: e1 },
        { data: insum,  error: e2 },
        { data: clien,  error: e3 },
        { data: pedid,  error: e4 },
        { data: vent,   error: e5 },
      ] = await Promise.all([
        supabase.from('productos').select('*').eq('activo', true).order('categoria').order('nombre'),
        supabase.from('insumos').select('*').eq('activo', true).order('nombre'),
        supabase.from('clientes').select('*').eq('activo', true).order('nombre'),
        supabase.from('pedidos').select('*, pedido_items(*)').neq('estado', 'cancelado').order('fecha_entrega'),
        supabase.from('ventas').select('*').order('created_at', { ascending: false }).limit(30),
      ])

      const err = e1 || e2 || e3 || e4 || e5
      if (err) throw err

      setProductos(prods  || [])
      setInsumos(insum    || [])
      setClientes(clien   || [])
      setPedidos(pedid    || [])
      setVentas(vent      || [])
    } catch (err) {
      console.error('Error cargando datos:', err)
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => { cargarTodo() }, [cargarTodo])


  // ══════════════════════════════════════════════════════════
  //  PRODUCTOS
  // ══════════════════════════════════════════════════════════

  const agregarProducto = async (prod) => {
    const { data, error } = await supabase
      .from('productos')
      .insert([{ ...prod, activo: true }])
      .select()
      .single()
    if (error) throw error
    setProductos(prev => [...prev, data])
    return data
  }

  const editarProducto = async (prod) => {
    const { data, error } = await supabase
      .from('productos')
      .update(prod)
      .eq('id', prod.id)
      .select()
      .single()
    if (error) throw error
    setProductos(prev => prev.map(p => p.id === prod.id ? data : p))
    return data
  }

  const descontarStock = async (items) => {
    // items = [{ id, qty }, ...]
    await Promise.all(
      items.map(({ id, qty }) =>
        supabase.rpc('decrementar_stock', { p_id: id, p_qty: qty })
      )
    )
    // Refrescar productos localmente
    setProductos(prev =>
      prev.map(p => {
        const item = items.find(i => i.id === p.id)
        return item ? { ...p, stock: Math.max(0, p.stock - item.qty) } : p
      })
    )
  }


  // ══════════════════════════════════════════════════════════
  //  INSUMOS
  // ══════════════════════════════════════════════════════════

  const agregarInsumo = async (ins) => {
    const { data, error } = await supabase
      .from('insumos')
      .insert([{ ...ins, activo: true }])
      .select()
      .single()
    if (error) throw error
    setInsumos(prev => [...prev, data])
    return data
  }

  const editarInsumo = async (ins) => {
    const { data, error } = await supabase
      .from('insumos')
      .update(ins)
      .eq('id', ins.id)
      .select()
      .single()
    if (error) throw error
    setInsumos(prev => prev.map(i => i.id === ins.id ? data : i))
    return data
  }


  // ══════════════════════════════════════════════════════════
  //  CLIENTES
  // ══════════════════════════════════════════════════════════

  const agregarCliente = async (cli) => {
    const { data, error } = await supabase
      .from('clientes')
      .insert([{ ...cli, puntos: 0, total_compras: 0, visitas: 0 }])
      .select()
      .single()
    if (error) throw error
    setClientes(prev => [...prev, data])
    return data
  }

  const editarCliente = async (cli) => {
    const { data, error } = await supabase
      .from('clientes')
      .update(cli)
      .eq('id', cli.id)
      .select()
      .single()
    if (error) throw error
    setClientes(prev => prev.map(c => c.id === cli.id ? data : c))
    return data
  }

  const sumarPuntos = async (clienteId, puntos) => {
    const cli = clientes.find(c => c.id === clienteId)
    if (!cli) return
    return editarCliente({
      ...cli,
      puntos:        cli.puntos + puntos,
      total_compras: cli.total_compras,
      visitas:       cli.visitas + 1,
    })
  }


  // ══════════════════════════════════════════════════════════
  //  PEDIDOS ESPECIALES
  // ══════════════════════════════════════════════════════════

  const agregarPedido = async (pedido) => {
    const { items, ...pedidoData } = pedido

    // 1. Insertar pedido
    const { data: nuevoPedido, error: e1 } = await supabase
      .from('pedidos')
      .insert([pedidoData])
      .select()
      .single()
    if (e1) throw e1

    // 2. Insertar items si hay
    if (items?.length) {
      const { error: e2 } = await supabase
        .from('pedido_items')
        .insert(items.map(it => ({ ...it, pedido_id: nuevoPedido.id })))
      if (e2) throw e2
    }

    setPedidos(prev => [...prev, { ...nuevoPedido, pedido_items: items || [] }])
    return nuevoPedido
  }

  const editarPedido = async (pedido) => {
    const { pedido_items, ...pedidoData } = pedido
    const { data, error } = await supabase
      .from('pedidos')
      .update(pedidoData)
      .eq('id', pedido.id)
      .select()
      .single()
    if (error) throw error
    setPedidos(prev => prev.map(p => p.id === pedido.id ? { ...data, pedido_items: pedido_items || [] } : p))
    return data
  }

  const cambiarEstadoPedido = async (id, estado) => {
    const { data, error } = await supabase
      .from('pedidos')
      .update({ estado })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: data.estado } : p))
  }


  // ══════════════════════════════════════════════════════════
  //  VENTAS
  // ══════════════════════════════════════════════════════════

  const registrarVenta = async ({ carrito, subtotal, descuento, total, clienteId, metodo }) => {
    // 1. Insertar venta
    const { data: nuevaVenta, error: e1 } = await supabase
      .from('ventas')
      .insert([{
        cliente_id:  clienteId || null,
        subtotal,
        descuento:   descuento || 0,
        total,
        metodo_pago: metodo || 'efectivo',
        estado:      'completada',
      }])
      .select()
      .single()
    if (e1) throw e1

    // 2. Insertar items de la venta
    const items = carrito.map(item => ({
      venta_id:       nuevaVenta.id,
      producto_id:    item.id,
      producto_nombre: item.nombre,
      cantidad:       item.qty,
      precio_unit:    item.precio,
      costo_unit:     item.costo || 0,
    }))
    const { error: e2 } = await supabase.from('venta_items').insert(items)
    if (e2) throw e2

    // 3. Descontar stock
    await descontarStock(carrito.map(i => ({ id: i.id, qty: i.qty })))

    // 4. Actualizar cliente (puntos + visitas)
    if (clienteId) {
      const puntosGanados = Math.floor(total / 10)
      await sumarPuntos(clienteId, puntosGanados)
    }

    // 5. Agregar al estado local
    setVentas(prev => [nuevaVenta, ...prev])
    return nuevaVenta
  }


  // ══════════════════════════════════════════════════════════
  //  CAJA
  // ══════════════════════════════════════════════════════════

  const abrirCaja = async (fondoInicial) => {
    // Cerrar si hay una abierta hoy
    await supabase
      .from('caja')
      .update({ estado: 'cerrada', closed_at: new Date().toISOString() })
      .eq('estado', 'abierta')
      .eq('fecha', new Date().toISOString().slice(0, 10))

    const { data, error } = await supabase
      .from('caja')
      .insert([{ fondo_inicial: fondoInicial, estado: 'abierta' }])
      .select()
      .single()
    if (error) throw error
    return data
  }

  const cerrarCaja = async (cajaId, resumen) => {
    const { data, error } = await supabase
      .from('caja')
      .update({ ...resumen, estado: 'cerrada', closed_at: new Date().toISOString() })
      .eq('id', cajaId)
      .select()
      .single()
    if (error) throw error
    return data
  }


  // ══════════════════════════════════════════════════════════
  //  REPORTES — consultas agregadas
  // ══════════════════════════════════════════════════════════

  const ventasPorDia = useCallback(async (dias = 7) => {
    const desde = new Date()
    desde.setDate(desde.getDate() - dias)

    const { data, error } = await supabase
      .from('ventas')
      .select('created_at, total')
      .gte('created_at', desde.toISOString())
      .eq('estado', 'completada')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Agrupar por fecha
    const mapa = {}
    data.forEach(v => {
      const fecha = v.created_at.slice(0, 10)
      if (!mapa[fecha]) mapa[fecha] = { fecha, total: 0, tickets: 0 }
      mapa[fecha].total   += v.total
      mapa[fecha].tickets += 1
    })
    return Object.values(mapa).sort((a, b) => b.fecha.localeCompare(a.fecha))
  }, [])


  // ── RETORNO ────────────────────────────────────────────────
  return {
    // Estado
    productos, insumos, clientes, pedidos, ventas,
    cargando, error,
    // Acciones
    cargarTodo,
    agregarProducto, editarProducto,
    agregarInsumo,   editarInsumo,
    agregarCliente,  editarCliente,  sumarPuntos,
    agregarPedido,   editarPedido,   cambiarEstadoPedido,
    registrarVenta,
    abrirCaja,       cerrarCaja,
    ventasPorDia,
    // Setters directos (para compatibilidad con componentes existentes)
    setProductos, setInsumos, setClientes, setPedidos,
  }
}