import { TravelChatbot } from '@/components/travel-chatbot';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <div className="text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-white mb-4">
            Your AI Travel Navigator
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-pink-100/70">
            From hidden gems to the safest stays, get personalized travel advice
            and deals.
          </p>
        </div>
      </section>

      <section>
        <TravelChatbot />
      </section>
    </div>
  );
}
