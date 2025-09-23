"use client";

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
import { API_ENDPOINTS } from '@/lib/endpoints';
import { useFormik } from 'formik';

export function CardLogin() {
  const [error, setError] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      console.log("SUBMIT DO FORMIK FOI ACIONADO!", values);
      setError('');
      try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, values);
        
        // Esta linha está CORRETA, pois a resposta contém 'access' e 'refresh'
        const { tokens } = response.data;
        
        console.log('2. RESPOSTA COMPLETA DA API:', response);
        
        // Vamos mover o redirecionamento para DENTRO da verificação
        // router.push(API_ENDPOINTS.AUTH.PROFILE); // Removido daqui

        // Esta verificação deveria funcionar.
        if (tokens && tokens.access && tokens.refresh) {
          // Salvamos os tokens no localStorage
          localStorage.setItem('accessToken', tokens.access);
          localStorage.setItem('refreshToken', tokens.refresh);
          
          // E finalmente, redirecionamos para a página de perfil
          router.push('/profile');
        } else {
          // Se a estrutura da resposta não for a esperada, mostramos um erro.
          console.error("A resposta da API não contém o objeto 'tokens' com os valores de 'access' e 'refresh'. Resposta recebida:", response.data);
          setError("Resposta de login inválida do servidor.");
        }

      } catch (err: any) {
        console.error("ERRO DETALHADO NO CATCH:", err);
        setError(err.response?.data?.message || 'Falha no login');
      }
    },
  });

  return (
    <Card className="h-full w-full max-w-sm shadow-2xl">
      <CardHeader>
        <Logo />
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="@gmail.com"
                required
                className="bg-gray-100"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                className="bg-gray-100"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="login-form"
          className="w-full bg-b2bit-blue text-white hover:bg-b2bit-blue-dark"
        >
          Sign-in
        </Button>
      </CardFooter>
    </Card>
  );
}