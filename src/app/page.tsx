import DailyWins from '@/components/daily-wins';
import WhyILeft from '@/components/why-i-left';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 text-gray-800 p-4 space-y-8 pt-8">
      <WhyILeft />
      <DailyWins />
    </div>
  );
}
