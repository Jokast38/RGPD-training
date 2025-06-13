import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CookieIcon from '@mui/icons-material/Cookie';
import { useCookies } from '../../context/CookieContext';
import { useCookieTracking } from '../../hooks/useCookieTracking';

const FooterContainer = styled.footer`
  background-color: #f8f8f8;
  padding: 50px 0 20px;
  margin-top: 50px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 0 20px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  margin-bottom: 20px;
`;

const ColumnTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 30px;
    height: 2px;
    background-color: rgb(0, 153, 255);
  }
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 10px;
  
  a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: rgb(0, 153, 255);
    }
  }

  button {
    background: none;
    border: none;
    color: #666;
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer;
    padding: 0;
    font-size: inherit;
    text-align: left;
    
    &:hover {
      color: rgb(0, 153, 255);
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  color: grey;
`;

const ContactIcon = styled.div`
  margin-right: 10px;
  color: rgb(0, 153, 255);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialIcon = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgb(0, 153, 255);
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgb(0, 123, 204);
    transform: translateY(-2px);
  }
`;

const NewsletterForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  
  &:focus {
    outline: none;
    border-color: rgb(0, 153, 255);
    box-shadow: 0 0 0 2px rgba(0, 153, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: rgb(0, 153, 255);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgb(0, 123, 204);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CopyrightSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #ddd;
  margin-top: 30px;
  color: #666;
`;

const CookieManagement = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const CookieButton = styled.button`
  background: none;
  border: 1px solid rgb(0, 153, 255);
  color: rgb(0, 153, 255);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: rgb(0, 153, 255);
    color: white;
  }
`;

const ConsentStatus = styled.div`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: ${props => props.hasConsent ? '#e8f5e8' : '#fff3cd'};
  border: 1px solid ${props => props.hasConsent ? '#c3e6c3' : '#ffeaa7'};
  border-radius: 4px;
  font-size: 12px;
  color: ${props => props.hasConsent ? '#2d5a2d' : '#856404'};
`;

const NewsletterSuccess = styled.div`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #e8f5e8;
  border: 1px solid #c3e6c3;
  border-radius: 4px;
  font-size: 14px;
  color: #2d5a2d;
`;

const Footer = () => {
  const { reopenBanner, cookieConsent, hasConsent } = useCookies();
  const { trackEvent, hasMarketing } = useCookieTracking();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    // Tracker l'événement seulement si l'utilisateur a consenti
    trackEvent('newsletter_signup', {
      email_domain: email.split('@')[1] || 'unknown',
      source: 'footer'
    });

    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous ajouteriez votre logique d'inscription à la newsletter
      console.log('Newsletter subscription:', email);
      
      setIsSubscribed(true);
      setEmail('');
      
      // Réinitialiser après 3 secondes
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCookieManagement = () => {
    trackEvent('cookie_preferences_opened', {
      source: 'footer'
    });
    reopenBanner();
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <ColumnTitle>Contact Info</ColumnTitle>
          <ContactItem>
            <ContactIcon><LocationOnIcon /></ContactIcon>
            <div>123 Example Street, City, Country</div>
          </ContactItem>
          <ContactItem>
            <ContactIcon><PhoneIcon /></ContactIcon>
            <div>+123 456 7890</div>
          </ContactItem>
          <ContactItem>
            <ContactIcon><EmailIcon /></ContactIcon>
            <div>contact@limupa.com</div>
          </ContactItem>
          <SocialLinks>
            <SocialIcon to="#"><FacebookIcon /></SocialIcon>
            <SocialIcon to="#"><TwitterIcon /></SocialIcon>
            <SocialIcon to="#"><InstagramIcon /></SocialIcon>
            <SocialIcon to="#"><YouTubeIcon /></SocialIcon>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle>Information</ColumnTitle>
          <LinksList>
            <LinkItem><Link to="/about">About Us</Link></LinkItem>
            <LinkItem><Link to="/delivery">Delivery Information</Link></LinkItem>
            <LinkItem><Link to="/privacy-policy">Privacy Policy</Link></LinkItem>
            <LinkItem><Link to="/cookie-policy">Cookie Policy</Link></LinkItem>
            <LinkItem><Link to="/terms">Terms & Conditions</Link></LinkItem>
            <LinkItem><Link to="/contact">Contact Us</Link></LinkItem>
            <LinkItem><Link to="/returns">Returns</Link></LinkItem>
          </LinksList>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle>Customer Service</ColumnTitle>
          <LinksList>
            <LinkItem><Link to="/shipping">Shipping Policy</Link></LinkItem>
            <LinkItem><Link to="/help">Help & FAQ</Link></LinkItem>
            <LinkItem><Link to="/account">My Account</Link></LinkItem>
            <LinkItem><Link to="/orders">Order History</Link></LinkItem>
            <LinkItem><Link to="/wishlist">Wishlist</Link></LinkItem>
            <LinkItem><Link to="/newsletter">Newsletter</Link></LinkItem>
            <LinkItem>
              <button onClick={handleCookieManagement}>
                Cookie Preferences
              </button>
            </LinkItem>
          </LinksList>
          
          <CookieManagement>
            <CookieButton onClick={handleCookieManagement}>
              <CookieIcon fontSize="small" />
              Manage Cookies
            </CookieButton>
            
            {cookieConsent && (
              <ConsentStatus hasConsent={hasConsent('analytics') || hasConsent('marketing')}>
                {hasConsent('analytics') || hasConsent('marketing') 
                  ? '✓ Cookies preferences saved' 
                  : 'ⓘ Only essential cookies active'
                }
              </ConsentStatus>
            )}
          </CookieManagement>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle>Subscribe to our newsletter</ColumnTitle>
          <p>Get the latest updates, news and special offers sent directly to your inbox.</p>
          
          {!hasMarketing && (
            <ConsentStatus hasConsent={false}>
              ⓘ Newsletter tracking requires marketing cookies consent
            </ConsentStatus>
          )}
          
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <InputField 
              type="email" 
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SubmitButton 
              type="submit" 
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </SubmitButton>
          </NewsletterForm>
          
          {isSubscribed && (
            <NewsletterSuccess>
              ✓ Successfully subscribed to our newsletter!
            </NewsletterSuccess>
          )}
        </FooterColumn>
      </FooterContent>
      
      <CopyrightSection>
        <p>&copy; {new Date().getFullYear()} Limupa. All Rights Reserved.</p>
        <div style={{ marginTop: '10px', fontSize: '12px' }}>
          <Link to="/privacy-policy" style={{ color: '#666', marginRight: '15px' }}>
            Privacy Policy
          </Link>
          <Link to="/cookie-policy" style={{ color: '#666', marginRight: '15px' }}>
            Cookie Policy
          </Link>
          <button 
            onClick={handleCookieManagement}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#666', 
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Cookie Settings
          </button>
        </div>
      </CopyrightSection>
    </FooterContainer>
  );
};

export default Footer;