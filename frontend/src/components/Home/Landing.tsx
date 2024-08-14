import bg from '@/assets/Background.jpg';

const Landing = () => {
  return (
    <div className="relative">
      <div className="relative w-full h-full">
        <img src={bg.src} alt="Background" className="object-cover" />
        <div className="absolute inset-0 bg-black lg:opacity-30 opacity-35"></div>
        <div className="absolute inset-0 flex flex-col items-center top-1/4 gap-6">
          <div className="lg:text-8xl text-5xl font-bold   font-sacramento text-white tracking-wider">
            Aspire Connect
          </div>
          <div className="lg:text-3xl text-center tracking-wider text-[#ffffff]">
            Build meaningful connections through shared dreams and goals
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
