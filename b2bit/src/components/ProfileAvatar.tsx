import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
  
  interface ProfileAvatarProps {
    src?: string;         
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