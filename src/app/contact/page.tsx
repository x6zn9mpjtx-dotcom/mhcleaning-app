'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      
      // Max 10 foto's controle
      if (images.length + newFiles.length > 10) {
        alert('Je kunt maximum 10 foto\'s uploaden');
        return;
      }

      // Controleer bestandstype
      const validFiles = newFiles.filter(file => {
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is geen afbeelding`);
          return false;
        }
        return true;
      });

      setImages((prev) => [...prev, ...validFiles]);

      // Maak previews
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviews((prev) => [...prev, event.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });

      // Reset input
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Maak een FormData object met de form gegevens en foto's
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('message', formData.message);
    
    // Voeg foto's toe
    images.forEach((image, index) => {
      submitData.append(`image_${index}`, image);
    });

    // Stuur naar API
    fetch('/api/contact', {
      method: 'POST',
      body: submitData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Succes:', data);
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setImages([]);
        setImagePreviews([]);
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Er is een fout opgetreden. Probeer het later opnieuw.');
      });
  };

  return (
    <div>
      {/* CONTACT HERO */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Vrijblijvende
            <br />
            <span className="hero-highlight">Offerte</span>
          </h1>
          <p className="hero-sub">
            Vul het formulier in en we nemen zo snel mogelijk contact met je op
          </p>
        </div>
      </section>

      {/* CONTACT FORMULIER */}
      <section className="section section-drops">
        <div className="container">
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Naam *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jouw naam"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="jouw@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefoonnummer *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+32(0)495 78 31 10"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Bericht *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Beschrijf wat je nodig hebt..."
                  rows={5}
                />
              </div>

              <div className="form-group">
                <label htmlFor="images">Foto's van je huis (max 10)</label>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={images.length >= 10}
                  className="file-input"
                />
                <p className="form-help-text">
                  Je hebt {images.length} van 10 foto's geüpload
                </p>
              </div>

              {imagePreviews.length > 0 && (
                <div className="image-previews">
                  <label>Geüploade foto's:</label>
                  <div className="preview-grid">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="preview-item">
                        <img src={preview} alt={`Preview ${index + 1}`} />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-btn"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary">
                Offerte aanvragen
              </button>

              {submitted && (
                <div className="success-message">
                  ✓ Bedankt! We nemen snel contact met je op.
                </div>
              )}
            </form>

            <div className="contact-info">
              <h3>Direct contact</h3>
              <p>
                <strong>Telefoon:</strong> <a href="tel:+32495783110">+32(0)495 78 31 10</a>
              </p>
              <p>
                <strong>WhatsApp:</strong> <a href="https://wa.me/32495783110">+32(0)495 78 31 10</a>
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:m.h.windowcleaning@outlook.com">m.h.windowcleaning@outlook.com</a>
              </p>
              <p>
                <strong>Regio:</strong> Lommel en omgeving
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
