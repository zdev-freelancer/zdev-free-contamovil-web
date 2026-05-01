interface ChallengeCardProps {
  challenge: unknown
  showProgress?: boolean
  allowEdit?: boolean
  onUpdate?: (progress: number) => void
  onEdit?: () => void
  onTogglePause?: () => void
}

export function ChallengeCard(_props: ChallengeCardProps) {
  return null
}