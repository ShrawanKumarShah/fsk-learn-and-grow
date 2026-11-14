type Props = { label: string }

export default function Badge({ label }: Props) {
  return (
    <span className="inline-block px-3 py-1 rounded-2xl bg-fsk-sunrise text-pine mr-2 mb-2 text-sm">
      {label}
    </span>
  )
}