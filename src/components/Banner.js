import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={4000}
        showArrows={false}
      >
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/PSS/Personal-Safety_1500x600._CB668022827_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Home/AmazonTV/Ravina/1500X600._CB668498028_.png" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/HFC_21/HeroPC_1500x600_1._CB669048608_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/Fresh/GW/May21/fresh-pc_021x._CB670987717_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/HPC/GW/Grocery_1500x600._CB669573043_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Home/LA/CBCC_Javed/Feb2021/Primehero/1500x600_Herotator_CBCC._CB661550702_.jpg" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
