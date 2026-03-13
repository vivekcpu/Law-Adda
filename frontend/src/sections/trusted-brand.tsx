export default function TrustedBrand() {
    const companyLogos: string[] = [
        '/assets/company-logo-1.svg',
        '/assets/company-logo-2.svg',
        '/assets/company-logo-3.svg',
        '/assets/company-logo-4.svg',
        '/assets/company-logo-5.svg',
    ]
    return (
        <section className="mt-32">
            <p className="py-6 text-center text-gray-400 text-base">Trusted by world's leading brands —</p>

            <div className="flex flex-wrap justify-between max-sm:justify-center gap-18 max-w-4xl w-full mx-auto py-4" id="logo-container">
                {companyLogos.map((logo, index) => <img key={index} src={logo} alt="logo" className="h-7 w-auto max-w-xs opacity-60" />)}
            </div>
        </section>
    );
}