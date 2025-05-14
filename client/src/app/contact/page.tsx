import React from "react";

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-cyan-800">Contactez-nous</h1>

      <p className="text-center text-gray-600 mb-10">
        Vous avez une question, une suggestion ou besoin d&apos;aide ? N&apos;hésitez pas à nous contacter via le formulaire
        ci-dessous.
      </p>

      <form className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nom complet</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Adresse e-mail</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="exemple@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            name="message"
            rows={5}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="Écrivez votre message ici..."
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-cyan-800 text-white font-semibold rounded-md hover:bg-cyan-700 transition"
          >
            Envoyer le message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
