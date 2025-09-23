import { CardProfile } from "@/components/CardProfile";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <>
    <header className="bg-white">
    <div className="container mx-auto flex h-16 items-right justify-end px-4">
          <Button className="bg-b2bit-blue text-white w-[20rem] mt-2">
            Logout
          </Button>
        </div>
    </header>
    <main className="flex min-h-screen flex-col items-center p-24 bg-profile-blue">
      <CardProfile></CardProfile>
    </main>
    </>
  );
}
