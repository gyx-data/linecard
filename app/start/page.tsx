import { Suspense } from "react";
import MultiStepForm from "./MultiStepForm";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#F3BA2F] selection:text-black">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-zinc-500">Chargement...</div>}>
        <MultiStepForm />
      </Suspense>
    </main>
  );
}
