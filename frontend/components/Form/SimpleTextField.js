import TextField from '@material-ui/core/TextField';


export const SimpleTextField = ({
  name,
  label,
  type,
  onChange,
  value,
}) =>
  <TextField
    name={name}
    type={type}
    label={label}
    value={value}
    onChange={e => onChange(e.target.value)}
    margin="normal"
  />;


export default SimpleTextField;
