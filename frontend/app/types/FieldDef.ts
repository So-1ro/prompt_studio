// app/types/FieldDef.ts
export type FieldDef = {
    id: string;
    label: string;
    type: "text" | "textarea";
    required?: boolean;
    placeholder?: string;
  };
  