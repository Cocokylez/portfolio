import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef(null)
  const trailRef = useRef(null)
  const pos      = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: null })

  useEffect(() => {
    const dot   = dotRef.current
    const trail = trailRef.current
    if (!dot || !trail) return

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const animate = () => {
      pos.current.tx += (pos.current.x - pos.current.tx) * 0.13
      pos.current.ty += (pos.current.y - pos.current.ty) * 0.13
      trail.style.left = pos.current.tx + 'px'
      trail.style.top  = pos.current.ty + 'px'
      pos.current.raf  = requestAnimationFrame(animate)
    }

    const hoverEls = document.querySelectorAll(
      'a, button, .skill-pill, .contact-card, .form-input, .avatar-glass'
    )
    const addHover = () => document.body.classList.add('cursor-hover')
    const remHover = () => document.body.classList.remove('cursor-hover')

    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', remHover)
    })

    document.addEventListener('mousemove', onMove)
    pos.current.raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(pos.current.raf)
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', remHover)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}   className="cursor-dot"   />
      <div ref={trailRef} className="cursor-trail" />
    </>
  )
}
