import Banner from "@/components/pages/home/banner";
import HowToBuy from "@/components/pages/home/HowToBuy";
import HowToSell from "@/components/pages/home/HowToSell";
import NewBooks from "@/components/pages/home/NewBooks";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Banner />
      <NewBooks />
      <HowToSell />
      <HowToBuy />
    </main>
  );
}
