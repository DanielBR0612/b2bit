"use client"; 

import { useEffect, useState } from "react";
import { api } from "@/lib/api"; 
import { CardProfile } from "@/components/CardProfile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { HeaderProfile } from "@/components/HeaderProfile";

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);
        setUserData(response.data);
      } catch (err) {
        setError('Não foi possível carregar os dados do perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); 

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <>
    <HeaderProfile></HeaderProfile>
    <main className="flex min-h-screen flex-col items-center p-24 bg-profile-blue text-black">
      {userData && <CardProfile userData={userData}></CardProfile>}
    </main>
    </>
  );
}
