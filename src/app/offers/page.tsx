import Balloons from '@/components/Balloons';
import OfferList from '@/components/OfferList';

export default function Offers() {
  return (
    <section id="offers" style={{ marginTop: '80px', position: 'relative' }}>
      <Balloons />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <OfferList />
      </div>
    </section>
  );
}
