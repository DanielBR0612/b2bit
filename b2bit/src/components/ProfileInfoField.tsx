// src/components/ProfileInfoField.tsx
import { Label } from "@/components/ui/label";
import type { ReactNode } from 'react';

interface ProfileInfoFieldProps {
  label: ReactNode;
  value: string;
}

export function ProfileInfoField({ label, value }: ProfileInfoFieldProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label>{label}</Label>
      <div 
        className="flex h-10 w-full items-center rounded-md bg-gray-100 px-3 py-2 text-sm text-muted-foreground"
      >
        {value}
      </div>
    </div>
  );
}