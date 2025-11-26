import bannerImage from "../../assets/bannerImage.svg";

const BannerSection = () => {
  return (
    <section className="relative w-full h-[450px]">
      <div className="bg-[#f5f5f5] w-full h-full relative overflow-hidden">
        <div className="absolute -top-7 -left-24 w-1/2 h-1/2 z-0">
          <img
            src={bannerImage}
            alt="Background"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center justify-center h-full relative z-10">
          <div className="w-1/2 text-center space-y-5">
            <h6 className="text-[#ffab00] font-bold text-[20px]">Portfolio</h6>
            <h1 className="text-6xl font-medium">
              Diverse,<span className="text-blue-500"> Impactful</span>, and
              Reliable.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
