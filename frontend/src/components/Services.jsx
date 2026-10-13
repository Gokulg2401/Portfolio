import { HiOutlineTemplate, HiOutlineServer, HiOutlineDatabase, HiOutlineShieldCheck } from 'react-icons/hi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const icons = {
  frontend: HiOutlineTemplate,
  backend: HiOutlineServer,
  database: HiOutlineDatabase,
  security: HiOutlineShieldCheck,
}

function Services({ services }) {
  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <SectionHeading eyebrow="What I do" title="From database to UI, I own the whole feature" />

        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = icons[service.icon] ?? HiOutlineServer
            return (
              <Reveal key={service.title} className="card service" delay={i * 90}>
                <span className="service-icon">
                  <Icon />
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
