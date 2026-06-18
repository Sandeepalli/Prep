import { ServerIcon, CodeIcon, ChipIcon, UserIcon, LayersIcon, BeakerIcon } from './Icons'

const map = {
  server: ServerIcon,
  code: CodeIcon,
  chip: ChipIcon,
  user: UserIcon,
  layers: LayersIcon,
  beaker: BeakerIcon,
}

export default function TrackIcon({ name, ...rest }) {
  const Cmp = map[name] || CodeIcon
  return <Cmp {...rest} />
}
