'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import teamData from '../data/team.json';
import { useState } from 'react';

export default function TeamPage() {
  const advisors = teamData.advisors ?? [];
  const members = teamData.members ?? [];
  const founder = members.find((member) => member.name === 'Vaibhav Sharma');
  const teamMembers = members.filter((member) => member.name !== founder?.name);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredAdvisor, setHoveredAdvisor] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="team-page">
        <section className="team-hero">
          <div className="container">
            <div className="hero-card">
              <div className="hero-copy">
                <h1>Kubar's Tech & Product Team</h1>
                <p>
                  Kubar Labs blends credit operations, data science, and policy expertise to automate MSME lending. Our founder and
                  advisors have shipped DeFi security solutions, architected CBDC platforms, and led lending innovation across India and beyond.
                </p>
              </div>
              {founder && (
                <div className="hero-founder">
                  <div className="founder-avatar">
                    <Image src={founder.image} alt={founder.name} width={128} height={128} />
                  </div>
                  <div className="founder-body">
                    <h2>{founder.name}</h2>
                    <p>{founder.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="team-main-section">
          <div className="container">
            <div className="team-layout">
              <div className="team-main-content">
                <div className="team-grid">
                  {teamMembers.map((member, index) => (
                    <article 
                      key={index} 
                      className="member-card"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="member-avatar-wrapper">
                        <div 
                          className="member-avatar" 
                          style={{ 
                            borderColor: member.accentColor,
                            transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: hoveredCard === index 
                              ? `0 8px 24px ${member.accentColor}40, 0 4px 12px ${member.accentColor}30`
                              : 'none'
                          }}
                        >
                          <Image src={member.image} alt={member.name} width={120} height={120} loading="lazy" />
                        </div>
                      </div>
                      <div className="member-info">
                        <h3>{member.name}</h3>
                        <p className="member-role">{member.role}</p>
                        {member.description && (
                          <p className="member-description">{member.description}</p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="team-sidebar">
                <div className="sidebar-section advisors-sidebar">
                  <div className="sidebar-header">
                    <h3>Advisors</h3>
                    <div className="sidebar-divider"></div>
                  </div>
                  <div className="sidebar-content">
                    {advisors.map((advisor, index) => (
                      <div 
                        key={index}
                        className="sidebar-item"
                        onMouseEnter={() => setHoveredAdvisor(index)}
                        onMouseLeave={() => setHoveredAdvisor(null)}
                      >
                        <div 
                          className="sidebar-avatar"
                          style={{
                            borderColor: advisor.accentColor,
                            transform: hoveredAdvisor === index ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: hoveredAdvisor === index 
                              ? `0 4px 16px ${advisor.accentColor}50`
                              : 'none'
                          }}
                        >
                          <Image src={advisor.image} alt={advisor.name} width={56} height={56} loading="lazy" />
                        </div>
                        <div className="sidebar-info">
                          <h4>{advisor.name}</h4>
                          <p>{advisor.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sidebar-section team-sidebar-section">
                  <div className="sidebar-header">
                    <h3>Team</h3>
                    <div className="sidebar-divider"></div>
                  </div>
                  <div className="sidebar-stats">
                    <div className="stat-item">
                      <span className="stat-number">{teamMembers.length + 1}</span>
                      <span className="stat-label">Team Members</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{advisors.length}</span>
                      <span className="stat-label">Advisors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .team-page {
          background: var(--color-background);
        }

        .team-hero {
          padding: calc(var(--spacing-3xl) + 2rem) 0 var(--spacing-2xl);
          background: linear-gradient(135deg, rgba(163, 230, 53, 0.18), rgba(15, 141, 104, 0.12));
        }

        .team-hero .hero-card {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-2xl);
          background: rgba(16, 16, 16, 0.85);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          padding: var(--spacing-2xl);
          backdrop-filter: blur(12px);
        }

        .team-hero .hero-copy h1 {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin-bottom: var(--spacing-md);
          background: linear-gradient(135deg, #ffffff, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .team-hero .hero-copy p {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          line-height: 1.8;
          max-width: 620px;
        }

        .hero-founder {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 18px;
          padding: var(--spacing-xl);
        }

        .founder-avatar {
          width: 128px;
          height: 128px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--color-primary);
          margin-bottom: var(--spacing-md);
        }

        .founder-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .founder-body h2 {
          font-size: 1.5rem;
          margin: 0;
        }

        .founder-body p {
          color: var(--color-text-secondary);
          margin: 0;
        }

        .team-main-section {
          padding: var(--spacing-3xl) 0;
          position: relative;
        }

        .team-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: var(--spacing-3xl);
          align-items: start;
        }

        .team-main-content {
          min-width: 0;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-xl);
        }

        .member-card {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: var(--spacing-xl);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .member-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .member-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 215, 0, 0.3);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 8px 24px rgba(255, 215, 0, 0.15),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .member-card:hover::before {
          opacity: 1;
        }

        .member-avatar-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: var(--spacing-md);
        }

        .member-avatar {
          width: 120px;
          height: 120px;
          border-radius: 20px;
          overflow: hidden;
          border: 3px solid var(--color-primary);
          background: var(--color-surface-elevated);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .member-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .member-info {
          text-align: center;
        }

        .member-info h3 {
          font-size: 1.35rem;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .member-role {
          font-size: 1rem;
          color: #ffd700;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .member-description {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .team-sidebar {
          position: sticky;
          top: calc(var(--spacing-3xl) + 80px);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .sidebar-section {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: var(--spacing-xl);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .sidebar-section:hover {
          border-color: rgba(255, 215, 0, 0.2);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .sidebar-header {
          margin-bottom: var(--spacing-lg);
        }

        .sidebar-header h3 {
          font-size: 1.5rem;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
          font-weight: 700;
        }

        .sidebar-divider {
          height: 2px;
          background: linear-gradient(90deg, var(--color-primary), transparent);
          border-radius: 2px;
        }

        .sidebar-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-sm);
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(4px);
        }

        .sidebar-avatar {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid var(--color-primary);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .sidebar-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sidebar-info {
          flex: 1;
          min-width: 0;
        }

        .sidebar-info h4 {
          font-size: 0.95rem;
          color: var(--color-text-primary);
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        .sidebar-info p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        .sidebar-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
        }

        .stat-item {
          text-align: center;
          padding: var(--spacing-md);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #ffd700;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          display: block;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        @media (max-width: 1200px) {
          .team-layout {
            grid-template-columns: 1fr;
            gap: var(--spacing-2xl);
          }

          .team-sidebar {
            position: static;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-xl);
          }
        }

        @media (max-width: 960px) {
          .team-hero .hero-card {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }

          .team-sidebar {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .team-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }

          .member-card {
            padding: var(--spacing-lg);
          }

          .member-avatar {
            width: 100px;
            height: 100px;
          }

          .sidebar-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
