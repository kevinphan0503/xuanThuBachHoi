import { useEffect, useRef } from 'react'

// Utility function để check và reveal các element visible
const checkAndRevealVisible = (elements, observer, options) => {
  elements.forEach((el) => {
    if (el.classList.contains('revealed')) return
    
    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    // widen the margins so items just below the fold get revealed on load
    const isVisible = rect.top < windowHeight + 400 && rect.bottom > -400
    
    if (isVisible) {
      el.classList.add('revealed')
      if (options.once !== false && observer) {
        observer.unobserve(el)
      }
    }
  })
}

export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observerOptions = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -100px 0px',
      ...options
    }

    // Tìm tất cả các element con có class reveal
    const revealElements = element.querySelectorAll(
      '.reveal-text, .reveal-fade, .reveal-slide-left, .reveal-slide-right'
    )

    // Nếu không có element con, observe chính element đó nếu nó có class reveal
    const elementsToObserve = revealElements.length > 0 
      ? Array.from(revealElements)
      : (element.classList.contains('reveal-text') || 
         element.classList.contains('reveal-fade') ||
         element.classList.contains('reveal-slide-left') ||
         element.classList.contains('reveal-slide-right'))
        ? [element]
        : []

    if (elementsToObserve.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          if (options.once !== false) {
            observer.unobserve(entry.target)
          }
        } else if (!options.once) {
          entry.target.classList.remove('revealed')
        }
      })
    }, observerOptions)

    // Observe tất cả các elements
    elementsToObserve.forEach((el) => {
      observer.observe(el)
    })

    // Kiểm tra ngay các element đã visible
    const checkVisible = () => {
      checkAndRevealVisible(elementsToObserve, observer, options)
    }

    // Check ngay và sau khi render (nhiều lần để đảm bảo)
    const runChecks = () => {
      // Check ngay lập tức
      checkVisible()
      
      // Check sau các khoảng thời gian
      requestAnimationFrame(checkVisible)
      setTimeout(checkVisible, 0)
      setTimeout(checkVisible, 10)
      setTimeout(checkVisible, 50)
      setTimeout(checkVisible, 100)
      setTimeout(checkVisible, 200)
      setTimeout(checkVisible, 500)
      setTimeout(checkVisible, 1000) // Fallback sau 1s
      // Final fallback: if elements still not revealed after 1.2s, reveal those close to viewport
      setTimeout(() => {
        elementsToObserve.forEach((el) => {
          if (!el.classList.contains('revealed')) {
            const rect = el.getBoundingClientRect()
            const windowHeight = window.innerHeight || document.documentElement.clientHeight
            if (rect.top < windowHeight * 2) {
              el.classList.add('revealed')
              if (options.once !== false && observer) {
                observer.unobserve(el)
              }
            }
          }
        })
      }, 1200)
    }
    
    // Chạy ngay
    runChecks()
    
    // Check lại sau khi page load hoàn toàn
    if (document.readyState === 'complete') {
      setTimeout(runChecks, 100)
    } else {
      window.addEventListener('load', () => setTimeout(runChecks, 100))
    }

    // Check khi scroll
    window.addEventListener('scroll', checkVisible, { passive: true })
    window.addEventListener('resize', checkVisible, { passive: true })

    // Cleanup
    const cleanup = () => {
      elementsToObserve.forEach((el) => {
        if (observer) observer.unobserve(el)
      })
      window.removeEventListener('scroll', checkVisible)
      window.removeEventListener('resize', checkVisible)
      window.removeEventListener('load', runChecks)
    }

    return cleanup
  }, [options])

  return elementRef
}

export default useScrollReveal

