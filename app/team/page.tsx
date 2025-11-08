import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import teamData from '../data/team.json';

export const metadata = {
  title: "Team — Kubar Labs",
  description: "Meet the Kubar Labs team accelerating MSME credit intelligence across India.",
};

export default function TeamPage() {
  const members = teamData.members ?? [];
  const founder = members.find((member) => member.name === 'Vaibhav Sharma');
  const roster = members.filter((member) => member.name !== founder?.name);

  return (
    <>
      <Header />
      <main className="team-page">
        <section className="team-hero">
          <div className="container">
            <div className="hero-card">
              <div className="hero-copy">
                <h1>Meet the Team</h1>
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
        <section className="team-roster" id="team">
          <div className="container">
            <header className="roster-header">
              <h2>The crew building Kubar Labs</h2>
              <p>Our collective brings lending, data science, policy, and storytelling together so MSMEs get credit that actually works.</p>
            </header>
            <div className="roster-grid">
              {roster.map((member, index) => (
                <article key={index} className="member-card">
                  <div className="member-avatar" style={{ borderColor: member.accentColor }}>
                    <Image src={member.image} alt={member.name} width={96} height={96} loading="lazy" />
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

