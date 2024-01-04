import React from 'react';
import './style.css'
const ServicesComponent = () => {
  const services = [
    {
      title: 'English Learning',
      description: 'Improve your English language skills with our comprehensive learning programs.',
      icon: 'fas fa-language',
    },
    {
      title: 'Arabic Learning',
      description: 'Learn the Arabic language and explore the rich culture and history of the Arab world.',
      icon: 'fas fa-language',
    },
    {
      title: 'French Learning',
      description: 'Discover the elegance of the French language and immerse yourself in the Francophone culture.',
      icon: 'fas fa-language',
    },
    {
      title: 'Public Speaking',
      description: 'Enhance your communication and presentation skills to become a confident public speaker.',
      icon: 'fas fa-microphone',
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{color:'blueviolet'}}>Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <i className={`${service.icon} text-4xl text-blue-500 mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesComponent;