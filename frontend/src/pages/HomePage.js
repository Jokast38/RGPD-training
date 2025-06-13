import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { useCart } from '../context/CartContext';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Styles pour la page d'accueil
const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HeroSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
`;

const MainPromo = styled.div`
  flex: 2;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 4px;
  position: relative;
`;

const SidePromos = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SidePromo = styled.div`
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 4px;
  height: 48%;
  position: relative;
`;

const PromoTag = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ff5252;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const Tab = styled.span`
  font-size: 16px;
  color: ${props => props.active ? '#000' : '#777'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  padding-bottom: 5px;
  border-bottom: ${props => props.active ? '2px solid #ffd200' : 'none'};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: 120px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const ProductBrand = styled.span`
  color: #777;
  font-size: 12px;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;

const ProductTitle = styled.h3`
  font-size: 14px;
  margin: 5px 0;
  color: #333;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  
  .original-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 8px;
    font-weight: normal;
  }
  
  .discount {
    color: #ff5252;
    font-size: 12px;
    margin-left: 5px;
  }
`;

const NewTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #2196f3;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

// const PromoSection = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 40px;
// `;

// const PromoCard = styled.div`
//   flex: 1;
//   background-color: #f8f8f8;
//   padding: 20px;
//   border-radius: 4px;
//   position: relative;
//   display: flex;
//   height: 150px;
// `;

// const PromoContent = styled.div`
//   flex: 1;
// `;

// const PromoImage = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const ShopButton = styled(Link)`
  display: inline-block;
  background-color: #ffd200;
  color: black;
  padding: 8px 15px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 10px;
`;


// Composant pour afficher les étoiles de notation
const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<StarIcon key={i} style={{ color: '#ffd200', fontSize: '16px' }} />);
    } else {
      stars.push(<StarBorderIcon key={i} style={{ color: '#ffd200', fontSize: '16px' }} />);
    }
  }
  return stars;
};

const HomePage = () => {
  // const { addToCart } = useCart(); // <-- Retire si tu n'utilises pas le contexte
  const [activeTab, setActiveTab] = useState('bestseller');
  const [products, setProducts] = useState([]);

  // Fonction pour ajouter au panier
  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId'); // Assure-toi que l'userId est bien stocké
    if (!userId) {
      alert('Vous devez être connecté pour ajouter au panier.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/cart/add?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId,
          quantity: 1
        })
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout au panier');
      alert('Produit ajouté au panier !');
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    // Appel à l'API backend pour récupérer les produits
    fetch('http://localhost:8080/produit/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data); // Mettre à jour les produits avec les données de l'API
      })
      .catch((error) => console.error('Erreur:', error));
  }, [activeTab]);

  return (
    <HomeContainer>
      <HeroSection>
        <MainPromo>
          <PromoTag>Sale Offer Black Friday This Week</PromoTag>
          <h2>Work Desk<br />Surface Studio 2018</h2>
          <p>Starting at <strong>$824.00</strong></p>
          <ShopButton to="/shop">SHOP NOW</ShopButton>
          <div style={{
            position: 'absolute',
            right: '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40%'
          }}>
            <img src="https://i.pinimg.com/736x/f2/0f/4c/f20f4c1877573fb8d76420745996acc5.jpg" alt="Work Desk" style={{ maxWidth: '100%' }} />
          </div>
        </MainPromo>

        <SidePromos>
          <SidePromo>
            <h4>Full HD Display</h4>
            <h3>Smartphone Meizu M5<br />New Color Green</h3>
            <p>Sale 20% OFF</p>
            <img
              src="https://vk.telefonon.ru/wp-content/uploads/2023/03/meizu-20-infinity-147x240.jpg.webp"
              alt="Smartphone"
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                width: '40%',
                maxHeight: '100%', // Empêche l'image de dépasser la hauteur du conteneur
                objectFit: 'contain' // Garde les proportions de l'image
              }}
            />
          </SidePromo>

          <SidePromo>
            <h4>Sale 20% Off At Store</h4>
            <h3>Playstation VR Plus<br />Network 2018</h3>
            <p>Sale 20% OFF</p>
            <img src="https://m.media-amazon.com/images/I/71OVwWVSjTL._AC_SL1500_.jpg" alt="Playstation VR" style={{
              position: 'absolute',
              right: '10px',
              bottom: '10px',
              width: '40%'
            }} />
          </SidePromo>
        </SidePromos>
      </HeroSection>

      <div>
        <SectionTitle>
          <span>Bestseller Products</span>
          <TabsContainer>
            <Tab active={activeTab === 'bestseller'} onClick={() => setActiveTab('bestseller')}>Bestseller Products</Tab>
            <Tab active={activeTab === 'new'} onClick={() => setActiveTab('new')}>New Products</Tab>
            <Tab active={activeTab === 'sale'} onClick={() => setActiveTab('sale')}>Sale Products</Tab>
          </TabsContainer>
        </SectionTitle>

      <ProductsGrid>
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProductCard key={product.id}>
              {product.isNew && <NewTag>New</NewTag>}
              <ProductImage src={product.image} alt={product.title} />
              <ProductBrand>{product.brand}</ProductBrand>
              <Rating>
                <RatingStars rating={product.rating} />
              </Rating>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>
                {product.originalPrice && (
                  <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                )}
                <span className="current-price">
                  ${product.prix ? product.prix.toFixed(2) : 'N/A'}
                </span>
                {product.discount && (
                  <span className="discount">-{product.discount}% OFF</span>
                )}
              </ProductPrice>
              {/* Ajoute le bouton ici */}
              <button
                style={{
                  marginTop: '10px',
                  background: '#ffd200',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                type="button"
                onClick={e => {
                  e.preventDefault(); // Pour ne pas suivre le lien
                  handleAddToCart(product.id);
                }}
              >
                Add to Cart
              </button>
            </ProductCard>
            </Link>
          ))}
        </ProductsGrid>
      </div>
    </HomeContainer>
  );
};

export default HomePage;