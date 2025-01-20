export interface InputFormProps {
    placeholder?: string;
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classInclude?: string;
    min?:number;
    max?:number;
  }