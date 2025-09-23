// src/app/page.tsx

// 1. Importe o componente que você criou no passo anterior.
import { CardLogin } from "@/components/CardLogin";

export default function HomePage() {
  return (
    // Usei algumas classes do Tailwind para centralizar o card na tela.
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      
      {/* 2. Use o componente como se fosse uma tag HTML. */}
      <CardLogin />
    </main>
  );
}