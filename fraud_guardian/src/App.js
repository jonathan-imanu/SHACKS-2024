
import './App.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function App() {
  const [file, setFile] = useState()
  const [data, setData] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // Default is English
  const [textareaValue, setTextareaValue] = useState(''); 
  const [progress, setProgress] = useState(100);

    
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    setLoading(true);
    setError(null); 
    setData(null);
  
    axios.post('http://localhost:5000/data', { text: textareaValue }, {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      onUploadProgress: (progressEvent) => {  // Add this part
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      }
  })
  .then((response) => {
      setData(response.data);
      console.log(response.data);
      setProgress(response.data.number);
  })
  .catch((err) => {
      setError(err.message);
  })
  .finally(() => {
      setLoading(false);
  });
  };

  function handleFile(event) {
    setFile(event.target.files[0])
  }

  function handleUpload() {
    const formData = new FormData()
    formData.append('file', file)
    fetch(
      'url',
      {
        method: "POST",
        body: formData
      }
    ).then((response) => response.json()).then(
      (result) => {
        console.log('success', result)
      }
    )
    .catch(error => {
      console.error("Error:", error)
    })
  }

  useEffect(() => {
    // Function to handle smooth scroll
    const handleSmoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    // Adding event listeners to links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup event listeners on component unmount
    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  // Animation variants for Fraud Prevention Tips
  const tipVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        type: 'spring',
        stiffness: 50,
      },
    }),
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-red-700 fixed top-0 left-0 w-full z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="images/logo.png" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {language === 'en' && 'ScotiaSafe Jobs'}
              {language === 'es' && 'ScotiaEmpleos seguros'} 
              {language === 'fr' && 'Emplois SécuriScotia'}
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-red-700 dark:border-gray-700">
              <li>
                <a href="#home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  {language === 'en' && 'Home'}
                  {language === 'es' && 'Inicio'}
                  {language === 'fr' && 'Accueil'}
                </a>
              </li>
              <li>
                <a href="#fraud-prevention" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  {language === 'en' && 'Fraud Prevention'}
                  {language === 'es' && 'Prevención de Fraude'}
                  {language === 'fr' && 'Prévention de la Fraude'}
                </a>
              </li>
              <li>
                <a href="#tasks" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  {language === 'en' && 'Tasks'}
                  {language === 'es' && 'Tareas'}
                  {language === 'fr' && 'Tâches'}
                </a>
              </li>
              <li>
                <a href="#links" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  {language === 'en' && 'Links'}
                  {language === 'es' && 'Enlaces'}
                  {language === 'fr' && 'Liens'}
                </a>
              </li>
              <button
                onClick={() => changeLanguage('en')}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('es')}
              >
                Español
              </button>
              <button
                onClick={() => changeLanguage('fr')}
              >
                Français
              </button>
            </ul>
          </div>
        </div>
      </nav>

      <div id="home" className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
        <form className="w-full max-w-4xl" onSubmit={handleSubmit} method="POST">
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-red-700 dark:border-gray-600">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <form onSubmit={handleUpload}>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input 
                      type="file" 
                      id="file-upload" 
                      name="file" 
                      onChange={handleFile} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <label 
                      htmlFor="file-upload" 
                      className="inline-block px-2 py-1 text-sm text-white bg-gray-500 rounded-lg cursor-pointer hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      {language === 'en' && 'Choose File'}
                      {language === 'es' && 'Elegir Archivo'}
                      {language === 'fr' && 'Choisir le Fichier'}
                    </label>
                  </div>
                  {file && (
                    <span className="text-sm text-gray-300">
                      {file.name}
                    </span>
                  )}
                </div>
              </form>
              <label
                className="inline-block px-2 py-1 text-sm text-white bg-red-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M10.836.357a1.978 1.978 0 0 0-2.138.3L3.63 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1.63l5.07 4.344a1.985 1.985 0 0 0 2.142.299A1.98 1.98 0 0 0 12 15.826V2.174A1.98 1.98 0 0 0 10.836.357Zm2.728 4.695a1.001 1.001 0 0 0-.29 1.385 4.887 4.887 0 0 1 0 5.126 1 1 0 0 0 1.674 1.095A6.645 6.645 0 0 0 16 9a6.65 6.65 0 0 0-1.052-3.658 1 1 0 0 0-1.384-.29Zm4.441-2.904a1 1 0 0 0-1.664 1.11A10.429 10.429 0 0 1 18 9a10.465 10.465 0 0 1-1.614 5.675 1 1 0 1 0 1.674 1.095A12.325 12.325 0 0 0 20 9a12.457 12.457 0 0 0-1.995-6.852Z"/>
                </svg>
                <span className="sr-only">
                  {language === 'en' && 'TTS'}
                  {language === 'es' && 'Texto a Voz'}
                  {language === 'fr' && 'Texte en Parole'}
                </span>
              </label>
            </div>
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-500">
              <textarea
                id="editor"
                rows="10"
                className="block w-full px-0 text-lg text-gray-800 bg-white border-0 dark:bg-gray-500 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder={language === 'en' ? 'Input...' : language === 'es' ? 'Entrada...' : 'Entrée...'}
                required
                value={textareaValue} 
                onChange={(e) => setTextareaValue(e.target.value)}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 text-m font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            {language === 'en' && 'Submit'}
            {language === 'es' && 'Enviar'}
            {language === 'fr' && 'Soumettre'}
          </button>

          {error && <div style={{ color: 'blue' }}>Error: {error}</div>} {/* Error message in blue */}
    

            {/* Progress Bar Section */}
            <div className="mt-8 relative w-full bg-gray-200 rounded-full h-6 dark:bg-gray-500">
            <div className="bg-red-700 h-6 rounded-full" style={{ width: '45%' }}></div>
            <div className="absolute inset-0 flex items-center justify-between px-3">
              <span className="text-m font-medium text-blue-700 dark:text-white">45%</span>
            </div>
            {/* Data rendering below the progress bar */}
<div className="flex justify-center mt-4">
  {data && data.message && (
    <div className="mt-8 max-w-full px-4">
      <span className="text-s font-medium text-center text-red-700 dark:text-red p-4 block">
        <pre className="p-4 bg-gray-100 rounded overflow-x-auto">
          {data.message}
        </pre>
      </span>
    </div>
  )}
</div>
          </div>
        </form>
      </div>

      {/* Fraud Prevention Section */}
      <div id="fraud-prevention" className="bg-orange-700 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          {language === 'en' && 'Job Application Fraud Prevention Tips'}
          {language === 'es' && 'Consejos para Prevenir Fraudes en Solicitudes de Empleo'}
          {language === 'fr' && 'Conseils pour Prévenir la Fraude lors des Candidatures d\'Emploi'}
        </h2>
        <div className="mt-4 space-y-4">
          {[
            language === 'en' && "Legitimate employers will never ask for payment during the hiring process.",
            language === 'es' && "Los empleadores legítimos nunca pedirán un pago durante el proceso de contratación.",
            language === 'fr' && "Les employeurs légitimes ne vous demanderont jamais de paiement pendant le processus d'embauche.",

            language === 'en' && "Be cautious if a job offer is made without an interview or with minimal interaction.",
            language === 'es' && "Ten cuidado si te ofrecen un trabajo sin una entrevista o con mínima interacción.",
            language === 'fr' && "Soyez prudent si une offre d'emploi est faite sans entretien ou avec une interaction minimale.",

            language === 'en' && "Avoid sharing sensitive personal information before verifying the legitimacy of the employer.",
            language === 'es' && "Evita compartir información personal sensible antes de verificar la legitimidad del empleador.",
            language === 'fr' && "Évitez de partager des informations personnelles sensibles avant de vérifier la légitimité de l'employeur.",

            language === 'en' && "Research the company and confirm job details from official sources before accepting an offer.",
            language === 'es' && "Investiga la empresa y confirma los detalles del trabajo en fuentes oficiales antes de aceptar una oferta.",
            language === 'fr' && "Faites des recherches sur l'entreprise et confirmez les détails du poste auprès de sources officielles avant d'accepter une offre.",

            language === 'en' && "Be wary of jobs that require you to purchase equipment or pay for training upfront.",
            language === 'es' && "Ten cuidado con los trabajos que te piden comprar equipo o pagar por capacitación por adelantado.",
            language === 'fr' && "Méfiez-vous des emplois qui vous demandent d'acheter du matériel ou de payer une formation à l'avance.",

            language === 'en' && "Avoid jobs that require you to transfer money or handle financial transactions as part of the job.",
            language === 'es' && "Evita trabajos que te pidan transferir dinero o manejar transacciones financieras como parte del trabajo.",
            language === 'fr' && "Évitez les emplois qui vous demandent de transférer de l'argent ou de gérer des transactions financières dans le cadre du travail.",

            language === 'en' && "Be cautious of job offers from unverified email addresses or unfamiliar domains.",
            language === 'es' && "Ten cuidado con las ofertas de trabajo que llegan desde direcciones de correo electrónico no verificadas o dominios desconocidos.",
            language === 'fr' && "Soyez prudent avec les offres d'emploi provenant d'adresses e-mail non vérifiées ou de domaines inconnus.",
          ].map((tip, index) => (
            <motion.p
              key={index}
              className="text-lg text-gray-600 dark:text-gray-300 text-center"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={tipVariants}
            >
              {tip}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div id="tasks" className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-red-700 dark:text-red mb-8">
          {language === 'en' && 'Job Application Fraud Busting Tasks'}
          {language === 'es' && 'Tareas Divertidas para Combatir Fraudes en Solicitudes de Empleo'}
          {language === 'fr' && 'Tâches Amusantes pour Éviter les Fraudes lors des Candidatures d\'Emploi'}
        </h2>

        <div className="w-3/4 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          <div className="bg-red-600 h-1.5 rounded-full dark:bg-red-700" style={{ width: '${progress}%' }}></div>
        </div>

        <div className="flex items-center mb-4">
          <input id="verify-job-offer-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="verify-job-offer-checkbox" className="ms-2 text-lg font-medium text-red-700 dark:text-red-700">
            {language === 'en' && '🕵️‍♂️ Play Detective: Verify the job offer before you apply!'}
            {language === 'es' && '🕵️‍♂️ Haz de Detective: ¡Verifica la oferta de trabajo antes de postularte!'}
            {language === 'fr' && '🕵️‍♂️ Faites le Détective: Vérifiez l\'offre d\'emploi avant de postuler !'}
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input id="research-company-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="research-company-checkbox" className="ms-2 text-lg font-medium text-red-700 dark:text-red-700">
            {language === 'en' && '🔍 Company Sleuth: Research the company like a pro!'}
            {language === 'es' && '🔍 Investigador de Empresas: ¡Investiga la empresa como un profesional!'}
            {language === 'fr' && '🔍 Détective de Société: Recherchez l\'entreprise comme un pro !'}
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input id="verify-contacts-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="verify-contacts-checkbox" className="ms-2 text-lg font-medium text-red-700 dark:text-red-700">
            {language === 'en' && '📞 Contact Check: Confirm the company’s contact details!'}
            {language === 'es' && '📞 Verificación de Contacto: ¡Confirma los datos de contacto de la empresa!'}
            {language === 'fr' && '📞 Vérification des Contacts: Confirmez les coordonnées de l\'entreprise !'}
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input id="avoid-unverified-sites-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="avoid-unverified-sites-checkbox" className="ms-2 text-lg font-medium text-red-700 dark:text-red-700">
            {language === 'en' && '🔒 Secure Site Check: Stick to verified and secure job application sites!'}
            {language === 'es' && '🔒 Verificación de Sitios Seguros: ¡Mantente en sitios de aplicaciones de empleo verificados y seguros!'}
            {language === 'fr' && '🔒 Vérification des Sites Sécurisés: Restez sur des sites de candidature vérifiés et sécurisés !'}
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input id="avoid-requests-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="avoid-requests-checkbox" className="ms-2 text-lg font-medium text-red-700 dark:text-red-700">
            {language === 'en' && '🚫 Payment Alert: Don’t pay or give personal info before applying!'}
            {language === 'es' && '🚫 Alerta de Pago: ¡No pagues ni des información personal antes de postularte!'}
            {language === 'fr' && '🚫 Alerte Paiement: Ne payez pas et ne donnez pas d\'informations personnelles avant de postuler !'}
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input id="report-suspicious-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="report-suspicious-checkbox" className="ms-2 text-lg font-medium text-red-700 dark:text-red-700">
            {language === 'en' && '⚠️ Report & Conquer: Report suspicious offers and fraud!'}
            {language === 'es' && '⚠️ Reporta y Conquista: ¡Reporta ofertas sospechosas y fraudes!'}
            {language === 'fr' && '⚠️ Signalez et Conquérez: Signalez les offres suspectes et la fraude !'}
          </label>
        </div>
      </div>

      {/* Links Section */}
      <div id="links" className="bg-orange-700 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          {language === 'en' && 'Scotiabank Links'}
          {language === 'es' && 'Enlaces de Scotiabank'}
          {language === 'fr' && 'Liens de Scotiabank'}
        </h2>
        
        <a className="mt-4 text-xl text-gray-600 dark:text-gray-300 hover:text-blue-900" href='https://www.scotiabank.com/ca/en/security/report-an-incident-or-suspicious-activity.html'>
          {language === 'en' && 'Report Fraud'}
          {language === 'es' && 'Reportar Fraude'}
          {language === 'fr' && 'Signaler une fraude'}
        </a>
        
        <a className="mt-4 text-xl text-gray-600 dark:text-gray-300 hover:text-blue-900" href='https://www.scotiabank.com/ca/en/security.html'>
          {language === 'en' && 'Fraud Resource Hub'}
          {language === 'es' && 'Centro de Recursos contra el Fraude'}
          {language === 'fr' && 'Centre de ressources contre la fraude'}
        </a>
        
        <a className="mt-4 text-xl text-gray-600 dark:text-gray-300 hover:text-blue-900" href='https://www.scotiabank.com/ca/en/personal/bank-your-way/digital-banking-guide/banking-basics/scotia-fraud-alerts.html'>
          {language === 'en' && 'Fraud Alerts'}
          {language === 'es' && 'Alertas de Fraude'}
          {language === 'fr' && 'Alertes de fraude'}
        </a>
        
        <a className="mt-4 text-xl text-gray-600 dark:text-gray-300 hover:text-blue-900" href='https://enrichedthinking.scotiawealthmanagement.com/2023/10/31/protecting-yourself-against-fraud/'>
          {language === 'en' && 'Fraud Protection'}
          {language === 'es' && 'Protección contra el Fraude'}
          {language === 'fr' && 'Protection contre la fraude'}
        </a>
        
        <a className="mt-4 text-xl text-gray-600 dark:text-gray-300 hover:text-blue-900" href='https://help.scotiabank.com/category/fraud?origin=dotcom_help'>
          {language === 'en' && 'Help Centre'}
          {language === 'es' && 'Centro de Ayuda'}
          {language === 'fr' && 'Centre d’aide'}
        </a>
      </div>
    </>
  );
}

export default App;
