import { Button } from "./ui/button";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { useRouter } from "next/navigation";

export function HeaderProfile() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            await api.post(API_ENDPOINTS.AUTH.LOGOUT, { refresh: refreshToken });
          }
        } catch (error) {
          console.error("Erro ao fazer logout na API, mas prosseguindo com o logout local:", error);
        } finally {
    
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          
          router.push('/'); 
        }
      };
    return(
        <header className="bg-white">
            <div className="container mx-auto flex h-16 items-right justify-end px-4">
                  <Button onClick={handleLogout} className="bg-b2bit-blue text-white w-[20rem] mt-2">
                    Logout
                  </Button>
                </div>
            </header>
    )
}