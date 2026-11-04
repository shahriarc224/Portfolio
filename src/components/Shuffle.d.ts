import type { CSSProperties, ReactElement } from 'react'

type ShuffleProps = {
  text?: string
  className?: string
  style?: CSSProperties
  effect?: 'slide' | 'flip' | 'blur'
  shuffleDirection?: 'left' | 'right' | 'up' | 'down'
  duration?: number
  maxDelay?: number
  ease?: string
  threshold?: number
  rootMargin?: string
  tag?: keyof JSX.IntrinsicElements
  textAlign?: CSSProperties['textAlign']
  onShuffleComplete?: () => void
  shuffleTimes?: number
  animationMode?: 'evenodd' | 'sequence' | 'center' | 'random'
  loop?: boolean
  loopDelay?: number
  stagger?: number
  scrambleCharset?: string
  colorFrom?: string
  colorTo?: string
  triggerOnce?: boolean
  respectReducedMotion?: boolean
  triggerOnHover?: boolean
  hoverRadius?: number
  motionBlur?: boolean
  color?: string
  accentColor?: string
}

declare function Shuffle(props: ShuffleProps): ReactElement
export default Shuffle
