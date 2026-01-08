import React, { useRef, useState, useEffect } from 'react'
import './RotatableImage.css'
import biaImg from '../../assets/bia.png'

const RotatableImage = ({ src = biaImg, alt = 'Bàn cờ 3D', size = 250 }) => {
  const containerRef = useRef(null)
  const pointerData = useRef({ dragging: false, lastX: 0, lastY: 0 })
  const [rotation, setRotation] = useState({ x: -15, y: 20 })

  /* Auto rotate mặc định */
  useEffect(() => {
    let rafId
    const step = () => {
      setRotation(r => ({
        x: r.x,
        y: (r.y + 0.4) % 360   // tốc độ xoay
      }))
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])

  /* Drag xoay bằng chuột */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onPointerDown = (e) => {
      pointerData.current.dragging = true
      pointerData.current.lastX = e.clientX
      pointerData.current.lastY = e.clientY
      el.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e) => {
      if (!pointerData.current.dragging) return
      const dx = e.clientX - pointerData.current.lastX
      const dy = e.clientY - pointerData.current.lastY
      pointerData.current.lastX = e.clientX
      pointerData.current.lastY = e.clientY

      setRotation(r => ({
        x: Math.max(-60, Math.min(60, r.x - dy * 0.2)),
        y: (r.y + dx * 0.3) % 360
      }))
    }

    const onPointerUp = (e) => {
      pointerData.current.dragging = false
      try { el.releasePointerCapture(e.pointerId) } catch {}
    }

    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  return (
    <div className="rotatable-wrap" style={{ width: size }}>
      <div ref={containerRef} className="rotatable-container">
        <div
          className="rotatable-inner"
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          <img src={src} alt={alt} />
        </div>
      </div>
    </div>
  )
}

export default RotatableImage
