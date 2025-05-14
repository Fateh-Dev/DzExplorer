import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-cyan-800"> À propos de nous</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
        Bienvenue sur notre plateforme de voyage ! Nous sommes une équipe passionnée par l&apos;exploration et l&apos;innovation
        dans le domaine du tourisme. Notre objectif est de vous aider à découvrir de nouveaux horizons en toute simplicité.
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8" />

      {/* Mission Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Notre Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Que vous planifiez des vacances en famille, un voyage d&apos;affaires, notre application vous propose les meilleures
          destinations, hébergements et expériences pour répondre à vos besoins.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Merci de faire confiance à notre service. N&apos;hésitez pas à nous contacter pour toute question ou suggestion !
        </p>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-8">
        <a
          href="/contact"
          className="inline-block px-6 py-3 border-2 border-cyan-900 text-cyan-900 rounded-md text-lg font-medium hover:bg-cyan-100 transition"
        >
          Contactez-nous
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
