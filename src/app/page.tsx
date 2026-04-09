import Hero from '@/components/Hero';
import BrutalTruth from '@/components/BrutalTruth';
import HowItWorks from '@/components/HowItWorks';
import QualityEconomy from '@/components/QualityEconomy';
import TwoShelfWarning from '@/components/TwoShelfWarning';
import SocialProof from '@/components/SocialProof';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <BrutalTruth />
      <HowItWorks />
      <QualityEconomy />
      <TwoShelfWarning />
      <SocialProof />
      <CTA />
    </>
  );
}
