import React from 'react'
import './FeatureSection.css'

const FeatureSection = ({ features }) => {
  return (
    <section className="section features-section">
      <div className="container">
        <h2 className="section-title">Tại sao chọn Xuân Thu Bách Hội?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
