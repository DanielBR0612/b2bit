import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export function CardLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/login', { email, password });

      const { token } = response.data;

      localStorage.setItem('authToken', token);

      router.push('/profile');

    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha no login');
    }
  };
  return (
    <Card className="h-full w-full max-w-sm shadow-2xl">
      <CardHeader>
        <Logo></Logo>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="@gmail.com"
                required
                className="bg-gray-100"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-gray-100"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full bg-b2bit-blue text-white hover:bg-b2bit-blue-100"
        >
          Sign-in
        </Button>
      </CardFooter>
    </Card>
  );
}
