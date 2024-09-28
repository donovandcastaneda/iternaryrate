import LocationCard from "../components/location-card";
import { DATA } from "../data/data";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-sans)]">
      <main className="space-y-12">
        <section className="align-center">
          <h1 className="text-2xl my-2 lg:text-4xl">Home</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DATA.locations.map((location) => (
              <LocationCard key={location.id} {...location} />
            ))}
          </div>
        </section>
        <section className="align-center">
          <h1 className="text-2xl my-2 lg:text-4xl">Popular</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DATA.locations.map((location) => (
              <LocationCard key={location.id} {...location} />
            ))}
          </div>
        </section>
        <section className="align-center">
          <h1 className="text-2xl my-2 lg:text-4xl">Random</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DATA.locations.map((location) => (
              <LocationCard key={location.id} {...location} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}