import { TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

//UseControllerProps  มีคุณสมบัติ name,control
interface Props extends UseControllerProps {
   label: string;
   multiline?: boolean;
   rows?: number;
   type?: string;
}

//วิธีใช้ https://react-hook-form.com/api/usecontroller
export default function AppTextInput(props: Props) {
  const {fieldState,field} =  useController({...props, defaultValue:""})  
  return (
    <TextField
    {...props}
    {...field}
    multiline={props.multiline}
    rows={props.rows}
    type={props.type}
    fullWidth
    variant='outlined'
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
    />
  )
}
