'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';

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
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    e.target.value = '';

    if (images.length + newFiles.length > MAX_IMAGES) {
      setError(`U kunt maximum ${MAX_IMAGES} foto's uploaden`);
      return;
    }

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

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('message', formData.message);
    submitData.append('website', honeypot);

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
    <>
      <section className="page-head">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Offerte aanvragen</span>
            <h1 className="display">Vrijblijvend en persoonlijk</h1>
            <p className="lede">
              Vul het formulier in en u krijgt binnen 8 uur een antwoord. Een
              paar foto&apos;s van uw woning helpen mij aan een correcte prijs.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="band band--cream">
        <div className="wrap contact-layout">
          <Reveal className="form-card">
            <form onSubmit={handleSubmit}>
              {/* Honeypot tegen spambots: onzichtbaar voor bezoekers */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="honeypot-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="field">
                <label htmlFor="name">Naam *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Uw naam"
                />
              </div>

              <div className="field">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="uw@email.be"
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Telefoonnummer *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+32 495 78 31 10"
                />
              </div>

              <div className="field">
                <label htmlFor="message">Bericht *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Beschrijf wat u nodig heeft..."
                  rows={5}
                />
              </div>

              <div className="field">
                <label htmlFor="images">Foto&apos;s van uw woning</label>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={images.length >= MAX_IMAGES || processing}
                  className="file-input"
                />
                <p className="field-hint">
                  {processing
                    ? "Foto's worden verwerkt..."
                    : `${images.length} van ${MAX_IMAGES} foto's toegevoegd`}
                </p>

                {imagePreviews.length > 0 && (
                  <div className="preview-grid">
                    {imagePreviews.map((preview, index) => (
                      <div key={preview} className="preview-item">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preview} alt={`Foto ${index + 1}`} />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-btn"
                          aria-label={`Foto ${index + 1} verwijderen`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="btn-row">
                <button
                  type="submit"
                  className="btn btn--gold"
                  disabled={sending || processing}
                >
                  {sending ? 'Versturen...' : 'Offerte aanvragen'}
                </button>
              </div>

              {submitted && (
                <div className="form-note form-note--ok">
                  Bedankt. Uw aanvraag is verstuurd, u hoort snel van mij.
                </div>
              )}

              {error && <div className="form-note form-note--error">{error}</div>}
            </form>
          </Reveal>

          <Reveal className="contact-aside" delay={0.12}>
            <h3>Liever direct contact?</h3>
            <dl>
              <div className="contact-row">
                <dt>Telefoon</dt>
                <dd>
                  <a href="tel:+32495783110">+32 495 78 31 10</a>
                </dd>
              </div>
              <div className="contact-row">
                <dt>WhatsApp</dt>
                <dd>
                  <a
                    href="https://wa.me/32495783110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +32 495 78 31 10
                  </a>
                </dd>
              </div>
              <div className="contact-row">
                <dt>E-mail</dt>
                <dd>
                  <a href="mailto:info@mhcleaning.be">info@mhcleaning.be</a>
                </dd>
              </div>
              <div className="contact-row">
                <dt>Werkgebied</dt>
                <dd>Lommel en directe omgeving</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
