import "./galleryContact.css";

function GalleryContactSection() {
  return (
    <section className="gallery-contact-section">

      {/* ================= GALLERY ================= */}
      <div className="gallery-wrapper">

        <div className="decor-line"></div>

        <h2 className="script-title">Gallery</h2>

        <div className="gallery-grid">
          <img src="/media/gallery1.avif" alt="" />
          <img src="/media/gallery2.avif" alt="" />
          <img src="/media/gallery3.avif" alt="" />
          <img src="/media/gallery4.avif" alt="" />
          <img src="/media/gallery5.avif" alt="" />
          <img src="/media/gallery6.avif" alt="" />
        </div>

        <div className="slider-dots">
          <span></span>
          <span></span>
          <span className="active"></span>
          <span></span>
          <span></span>
        </div>

        <div className="decor-line"></div>
      </div>

      {/* ================= CONTACT ================= */}
      <div className="contact-wrapper">

        <h2 className="script-title">Contact Us</h2>

        <div className="contact-content">

          {/* LEFT SIDE */}
          <div className="contact-left">

            <div className="contact-details">
              <h3>Contact Details</h3>
              <p><strong>Address:</strong> 8901 Marmora Road, Glasgow</p>
              <p><strong>Freephone:</strong> +1 800 234 567</p>
              <p><strong>Telephone:</strong> +1 900 234 567</p>
              <p><strong>FAX:</strong> +1 800 359 6580</p>
              <p><strong>Email:</strong> mail@domain.com</p>
            </div>

            <div className="contact-form">
              <h3>Contact Form</h3>

              <div className="form-row">
                <input type="text" placeholder="Your name" />
                <input type="email" placeholder="Email" />
              </div>

              <textarea placeholder="Message / comments"></textarea>

              <button>SUBMIT FORM</button>
            </div>

          </div>

         {/* RIGHT SIDE MAP */}
        <div className="contact-map">
        <div className="map-frame">
            <iframe
            src="https://www.google.com/maps?q=Glasgow&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
            ></iframe>
        </div>
        </div>

        </div>
      </div>

    </section>
  );
}

export default GalleryContactSection;