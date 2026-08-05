'use client';

import { useState } from 'react';

// Telefoonfoto's zijn al snel 5 MB per stuk. We verkleinen ze in de browser,
// anders komt de aanvraag nooit door de limiet van de server heen.
const MAX_DIMENSION = 1600;
const MAX_IMAGES = 10;

function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
          resolve(new File([blob], name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        0.75
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Kon de afbeelding niet lezen'));
    };

    img.src = objectUrl;
  });
}

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
  const [processing, setProcessing] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    e.target.value = '';

    // Max 10 foto's controle
    if (images.length + newFiles.length > MAX_IMAGES) {
      setError(`Je kunt maximum ${MAX_IMAGES} foto's uploaden`);
      return;
    }

    // Controleer bestandstype
    const validFiles = newFiles.filter((file) => file.type.startsWith('image/'));
    if (validFiles.length !== newFiles.length) {
      setError('Alleen afbeeldingen kunnen geüpload worden');
    }

    setProcessing(true);
    try {
      for (const file of validFiles) {
        const compressed = await compressImage(file);
        // Foto en preview samen toevoegen, zodat ze in dezelfde volgorde blijven
        setImages((prev) => [...prev, compressed]);
        setImagePreviews((prev) => [...prev, URL.createObjectURL(compressed)]);
      }
    } catch {
      setError('Een van de foto\'s kon niet verwerkt worden');
    } finally {
      setProcessing(false);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSending(true);

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: submitData,
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        setError(data?.error ?? 'Er is een fout opgetreden. Probeer het later opnieuw.');
        return;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setImages([]);
      setImagePreviews([]);
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Er is een fout opgetreden. Probeer het later opnieuw.');
    } finally {
      setSending(false);
    }
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
                  disabled={images.length >= MAX_IMAGES || processing}
                  className="file-input"
                />
                <p className="form-help-text">
                  {processing
                    ? "Foto's worden verwerkt..."
                    : `Je hebt ${images.length} van ${MAX_IMAGES} foto's toegevoegd`}
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

              <button type="submit" className="btn-primary" disabled={sending || processing}>
                {sending ? 'Versturen...' : 'Offerte aanvragen'}
              </button>

              {submitted && (
                <div className="success-message">
                  ✓ Bedankt! We nemen snel contact met je op.
                </div>
              )}

              {error && <div className="error-message">{error}</div>}
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
                <strong>Email:</strong> <a href="mailto:info@mhcleaning.be">info@mhcleaning.be</a>
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
