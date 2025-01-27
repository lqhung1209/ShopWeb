import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div>
          <h3>CUSTOMER SERVICES</h3>
          <p>Help & Contact Us</p>
          <p>Returns & Refunds</p>
          <p>Online Stores</p>
          <p>Terms & Conditions</p>
        </div>
        <div>
          <h3>COMPANY</h3>
          <p>What We Do</p>
          <p>Available Services</p>
          <p>Lastes Posts</p>
          <p>FAQs</p>
        </div>
        <div>
          <h3>SOCIAL MEDIA</h3>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Printerest</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
