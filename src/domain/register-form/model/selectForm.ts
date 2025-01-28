export interface Option {
  value: string;
  label: string;
}

export interface SelectFormProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  error?: string;
} 