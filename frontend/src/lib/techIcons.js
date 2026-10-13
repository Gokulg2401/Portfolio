import { FaJava, FaAws, FaDatabase } from 'react-icons/fa'
import {
  SiSpringboot,
  SiSpring,
  SiSpringsecurity,
  SiHibernate,
  SiReact,
  SiReactrouter,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiApachemaven,
  SiJson,
  SiGithubcopilot,
  SiClaude,
  SiGooglegemini,
} from 'react-icons/si'

const java = { icon: FaJava, color: '#f89820' }
const spring = { icon: SiSpring, color: '#6db33f' }
const react = { icon: SiReact, color: '#61dafb' }
const js = { icon: SiJavascript, color: '#f7df1e' }
const sql = { icon: FaDatabase, color: '#e05252' }

/** Maps skill names (as written in profile.json) to a brand icon + colour. */
export const techIcons = {
  Java: java,
  'Spring Boot': { icon: SiSpringboot, color: '#6db33f' },
  'Spring MVC': spring,
  'Spring Data JPA': spring,
  'Spring Security': { icon: SiSpringsecurity, color: '#6db33f' },
  Hibernate: { icon: SiHibernate, color: '#bcae79' },
  React: react,
  'React Hooks': react,
  'React Router': { icon: SiReactrouter, color: '#f44250' },
  JavaScript: js,
  'JavaScript (ES6+)': js,
  HTML5: { icon: SiHtml5, color: '#e34f26' },
  CSS3: { icon: SiCss, color: '#3b82f6' },
  'Microsoft SQL Server': sql,
  'MS SQL Server': sql,
  SQL: sql,
  Docker: { icon: SiDocker, color: '#2496ed' },
  Git: { icon: SiGit, color: '#f05032' },
  GitHub: { icon: SiGithub, color: '#e6e9f2' },
  Postman: { icon: SiPostman, color: '#ff6c37' },
  Maven: { icon: SiApachemaven, color: '#c71a36' },
  AWS: { icon: FaAws, color: '#ff9900' },
  JSON: { icon: SiJson, color: '#cbd5e1' },
  'GitHub Copilot': { icon: SiGithubcopilot, color: '#e6e9f2' },
  Claude: { icon: SiClaude, color: '#d97757' },
  Gemini: { icon: SiGooglegemini, color: '#8e75ff' },
}
