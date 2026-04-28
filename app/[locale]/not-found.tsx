import Link from "next/link";
import { Button } from "@/components/ui/button";
import TerminalCTA from "@/components/sections/TerminalCTA";

export default function NotFound() {
  return (
    <>
      <div className="http-error-page flex-grow flex flex-col items-center justify-center py-64 px-6 text-center">
        <h1 className="mb-4">
          404
        </h1>
        <p className="text-xl text-gray-700 mb-2">Sivua ei löydy</p>
        <p className="text-gray-500 mb-10 max-w-md">
          Etsimääsi sivua ei ole olemassa tai se on siirretty.
        </p>
        <Button asChild>
          <Link href="/fi">Palaa etusivulle</Link>
        </Button>
      </div>
      <TerminalCTA
        title="Tervetuloa juuri sellaisena kuin olet"
        paragraph="Uskon, että jokaisessa ihmisessä on jo olemassa suunta kohti tasapainoa. Joskus tarvitsemme vain toisen ihmisen kulkemaan hetken rinnalla."
        buttons={[{ label: "Varaa aika", href: "/fi/yhteystiedot" }]}
      />
    </>
  );
}
