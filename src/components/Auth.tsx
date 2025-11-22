// Auth.tsx - VERSION CORRIGÉE
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../App"; // 🔥 CHANGEMENT ICI : Import depuis App au lieu de context/AuthContext
import { supabase } from "../supabaseClient";

const DEV_MODE = true;
const DEV_OTP = "123456";

const Auth: React.FC = () => {
  const { supabaseUser } = useAuth(); // 🔥 Utiliser supabaseUser au lieu de user
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (supabaseUser) navigate(from, { replace: true });
  }, [supabaseUser, navigate, from]);

  const sendOTP = async () => {
    if (!phone) return setMessage("Entrez votre numéro de téléphone.");
    if (!fullName) return setMessage("Entrez votre nom complet.");

    setLoading(true);
    setMessage("");

    if (DEV_MODE) {
      setTimeout(() => {
        setLoading(false);
        setOtpSent(true);
        setMessage(`✨ Code de test : ${DEV_OTP}`);
      }, 800);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        data: { full_name: fullName }
      }
    });

    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setOtpSent(true);
    setMessage("Code envoyé avec succès !");
  };

  const verifyOTP = async () => {
    const token = otp.join("");
    if (token.length < 6) return setMessage("Le code doit contenir 6 chiffres.");

    setLoading(true);
    setMessage("");

    if (DEV_MODE) {
      if (token === DEV_OTP) {
        const testEmail = `test_${phone.replace(/[^0-9]/g, '')}@glucolife.dev`;

        try {
          // Essayer de créer le compte
          await supabase.auth.signUp({
            email: testEmail,
            password: 'TestPassword123!',
            options: {
              data: {
                full_name: fullName,
                phone: phone
              }
            }
          });

          // Se connecter
          const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: 'TestPassword123!'
          });

          setLoading(false);

          if (signInError && !signInError.message.includes('Email not confirmed')) {
            setMessage("Erreur : " + signInError.message);
            return;
          }

          if (data?.session) {
            setMessage("✅ Connexion réussie ! Redirection...");
            
            // ✅ Attendre que le contexte se mette à jour
            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 500);
          } else {
            setMessage("Erreur: Impossible de créer la session");
          }
        } catch (error: any) {
          setLoading(false);
          setMessage("Erreur : " + error.message);
        }
      } else {
        setLoading(false);
        setMessage(`❌ Code incorrect. Utilisez ${DEV_OTP}`);
      }
      return;
    }

    // MODE PRODUCTION
    const { data, error } = await supabase.auth.verifyOtp({
      type: "sms",
      phone,
      token
    });

    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }

    const sessionUser = data?.user ?? data?.session?.user;
    if (!sessionUser) {
      return setMessage("Impossible de récupérer l'utilisateur.");
    }

    setMessage("Connexion réussie ! Redirection...");
    setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 500);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) (prev as HTMLInputElement).focus();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c2f28 0%, #0f3a30 50%, #0c2f28 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Éléments décoratifs */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '40px',
          width: '288px',
          height: '288px',
          background: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '40px',
          width: '384px',
          height: '384px',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '448px',
        color: 'white',
        position: 'relative',
        zIndex: 10
      }}>
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #4ade80 0%, #10b981 100%)',
            borderRadius: '16px',
            marginBottom: '16px',
            boxShadow: '0 20px 25px -5px rgba(34, 197, 94, 0.3)'
          }}>
            <span style={{ fontSize: '48px' }}>🩺</span>
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '8px',
            background: 'linear-gradient(to right, #86efac, #6ee7b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            GlucoLife
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
            {DEV_MODE && "🧪 Mode développement • "}
            Suivez votre glycémie facilement
          </p>
        </div>

        {/* Carte principale */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Message */}
          {message && (
            <div style={{
              background: message.includes("succès") || message.includes("✅") || message.includes("✨")
                ? 'rgba(34, 197, 94, 0.2)'
                : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid ${message.includes("succès") || message.includes("✅") || message.includes("✨")
                ? 'rgba(74, 222, 128, 0.5)'
                : 'rgba(248, 113, 113, 0.5)'}`,
              color: message.includes("succès") || message.includes("✅") || message.includes("✨")
                ? '#86efac'
                : '#fca5a5',
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {message}
            </div>
          )}

          {!otpSent ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                  Bienvenue !
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                  Connectez-vous pour continuer
                </p>
              </div>

              <div>
                <label htmlFor="fullName" style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Nom complet
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jean Dupont"
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    outline: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '16px',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4ade80'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
              </div>

              <div>
                <label htmlFor="phone" style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Numéro de téléphone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+227 90 00 00 00"
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    outline: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '16px',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4ade80'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
              </div>

              <button
                onClick={sendOTP}
                disabled={loading}
                type="button"
                style={{
                  width: '100%',
                  padding: '16px',
                  marginTop: '16px',
                  background: 'linear-gradient(to right, #22c55e, #10b981)',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  color: 'white',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.3)',
                  transition: 'all 0.2s',
                  fontSize: '16px'
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
              >
                {loading ? "Envoi en cours..." : "Recevoir le code"}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  background: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '16px',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: '32px' }}>🔒</span>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Vérification
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                  Code envoyé au<br />
                  <span style={{ fontWeight: 'bold', color: 'white' }}>{phone}</span>
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                margin: '32px 0'
              }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    name={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{
                      width: '56px',
                      height: '56px',
                      textAlign: 'center',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      outline: 'none',
                      color: 'white',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#4ade80';
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  />
                ))}
              </div>

              <button
                onClick={verifyOTP}
                disabled={loading}
                type="button"
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(to right, #22c55e, #10b981)',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  color: 'white',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.3)',
                  transition: 'all 0.2s',
                  fontSize: '16px'
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
              >
                {loading ? "Vérification..." : "Valider le code"}
              </button>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={sendOTP}
                  type="button"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    background: 'none',
                    border: 'none',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    marginBottom: '8px'
                  }}
                >
                  Renvoyer le code
                </button>
                <br />
                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp(new Array(6).fill(""));
                    setMessage("");
                  }}
                  type="button"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  ← Modifier le numéro
                </button>
              </div>
            </div>
          )}
        </div>

        <p style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '12px',
          marginTop: '24px'
        }}>
          En vous connectant, vous acceptez nos conditions d'utilisation
        </p>
      </div>
    </div>
  );
};

export default Auth;