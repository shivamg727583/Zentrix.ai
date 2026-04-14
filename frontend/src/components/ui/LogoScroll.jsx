function LogoScroll() {
  const logos = [
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/instagram.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/facebook.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/slack.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/framer.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/netflix.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/google.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/linkedin.svg",
  ];

  return (
    <div className="relative w-full overflow-hidden py-8 ">

      {/* fade left */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#f7f4f4] to-transparent z-10" />

      {/* fade right */}
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#fefefe] to-transparent z-10" />

      <div className="flex animate-marquee items-center">

        {/* group 1 */}
        <div className="flex items-center gap-16 px-8">
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo}
              className="h-6 sm:h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition"
              draggable="false"
            />
          ))}
        </div>

        {/* group 2 */}
        {/* <div className="flex items-center gap-16 px-8">
          {logos.map((logo, i) => (
            <img
              key={"dup-" + i}
              src={logo}
              className="h-6 sm:h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition"
              draggable="false"
            />
          ))}
        </div> */}

      </div>
    </div>
  );
}

export default LogoScroll;