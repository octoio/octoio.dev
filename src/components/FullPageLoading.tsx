import LoadingSpinner from './LoadingSpinner'

interface FullPageLoadingProps {
  text: string
  background?: string
}

export default function FullPageLoading({ 
  text, 
  background = 'white' 
}: FullPageLoadingProps) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background 
    }}>
      <LoadingSpinner text={text} />
    </div>
  )
}