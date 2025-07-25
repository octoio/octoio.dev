import Link from 'next/link'
import { COMMON_STYLES } from '@/styles/constants'

interface BackNavigationProps {
  href?: string
  text?: string
}

export default function BackNavigation({ 
  href = "/", 
  text = "Back to Home" 
}: BackNavigationProps) {
  return (
    <Link href={href} className={COMMON_STYLES.backNav}>
      ← {text}
    </Link>
  )
}