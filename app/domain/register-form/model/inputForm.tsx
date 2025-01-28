import React from 'react';

export interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    label?: string,
    error?: string,
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classInclude?: string;
    min?: number | string;
    max?: number | string;
}