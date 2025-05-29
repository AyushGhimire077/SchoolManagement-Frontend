export interface BSDateSelectorProps {
    label?: string;
    defaultValue?: string;
    onChange: (bsDate: string, adDate: string | null) => void;
}
