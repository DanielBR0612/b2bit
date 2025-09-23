// src/components/ProfileAvatar.tsx

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
  
  // Definimos as propriedades que nosso componente vai aceitar
  interface ProfileAvatarProps {
    src: string;         
    fallback: string; 
    className?: string; 
  }
  
  export function ProfileAvatar({ src, fallback, className }: ProfileAvatarProps) {
    return (
      <Avatar className={className}>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    );
  }