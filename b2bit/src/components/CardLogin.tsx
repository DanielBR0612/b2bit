"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import axios from 'axios';
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
      setError('');
      try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, values);
        
        const { tokens } = response.data;
        
        if (tokens && tokens.access && tokens.refresh) {
          localStorage.setItem('accessToken', tokens.access);
          localStorage.setItem('refreshToken', tokens.refresh);
          router.push('/profile');
        } else {
          setError("Resposta de login inválida do servidor.");
        }

      } catch (err: unknown) { 
        console.error("ERRO DETALHADO NO CATCH:", err);

        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'Falha no login');
        } else {
          setError('Ocorreu um erro inesperado. Verifique sua conexão.');
        }
      }
    },
  });

  return (
    <Card className="w-full max-w-sm shadow-2xl">

      <CardHeader className="p-8">
        <Logo className="h-full w-full" />
      </CardHeader>
      
      <CardContent className="px-8">
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

      {error && (
        <div className="px-8 pb-4"> 
          <p className="text-sm font-medium text-red-500 text-center">
            {error}
          </p>
        </div>
      )}
      
      <CardFooter className="flex-col gap-6 px-8 pb-8 pt-4">
        <Button
          type="submit"
          form="login-form"
          className="w-full h-[3rem] font-bold bg-b2bit-blue text-white hover:bg-b2bit-blue-dark"
        >
          Sign-in
        </Button>
      </CardFooter>
    </Card>
  );
}