import { Inline, Label, Switch } from '@sanity/ui';

type SwitchWithLabelProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
};
const SwitchWithLabel = ({ checked, label, onChange }: SwitchWithLabelProps) => (
  <Inline space={[2, 3]}>
    <Switch checked={checked} label={label} onChange={onChange} />
    <Label size={0}>{label}</Label>
  </Inline>
);

export default SwitchWithLabel;
