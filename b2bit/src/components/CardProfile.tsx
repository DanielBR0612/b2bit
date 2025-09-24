import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileInfoField } from "./ProfileInfoField";
import { ProfileAvatar } from "./ProfileAvatar";

interface CardProfileProps {
    userData: {
      name: string;
      email: string;
      avatar: string; 
    };
  }

export function CardProfile({userData}: CardProfileProps) {
  const initials = userData.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase(); 

  return (
    <Card className="h-full w-full max-w-sm shadow-2xl text-gray-500 text-xs font-light text-black bg-white">
      <CardHeader className="flex flex-col items-center text-center justify-center">
        <p>Profile picture</p>
        <ProfileAvatar
          className="h-[3.5rem] w-[3.5rem] mb-4" 
          src={userData.avatar.high}
          fallback={initials}
        />
      </CardHeader>
      <CardContent>
        <ProfileInfoField
          label={
            <>
              Your<span className="font-bold">Name</span>
            </>
          }
          value={userData.name}
        />
        <br></br>
        <ProfileInfoField
          label={
            <>
              Your<span className="font-bold">E-mail</span>
            </>
          }
          value={userData.email}
        />
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
