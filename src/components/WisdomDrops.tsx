const drops = [
  'It is okay to feel upset. Take a breath before you choose what to do.',
  'Small steps help big dreams grow.',
  'Kind words help friends feel safe and included.'
]

export default function WisdomDrops() {
  const index = Math.floor(Date.now() / (1000 * 60 * 60)) % drops.length
  return (
    <div className="fsk-surface p-5">
      <div className="flex items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-fsk-dusk/70" />
        <p className="text-pine">A wise thought</p>
      </div>
      <p className="mt-2 text-gray-700">{drops[index]}</p>
    </div>
  )
}
