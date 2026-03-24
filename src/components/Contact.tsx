import React from 'react';
import styles from './Contact.module.css';
import { portfolioData } from '../data';
import { Mail, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
    return (
        <section className={styles.contactContainer} id="contact">
            <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Get In Touch
            </motion.h2>

            <motion.p
                className={styles.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                I’m open to discussing opportunities, projects, and collaborations.
                <br /><br />
                If my work resonates with you, feel free to reach out — I’d be happy to connect.
            </motion.p>

            <motion.div
                className={styles.links}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <a href={`mailto:${portfolioData.personal.contact.email}`} className={styles.contactLink}>
                    <Mail size={20} />
                    <span>{portfolioData.personal.contact.email}</span>
                </a>

                <a href={portfolioData.personal.contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    <Linkedin size={20} />
                    <span>LinkedIn Profile</span>
                </a>

                <a href={portfolioData.personal.contact.github} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    <Github size={20} />
                    <span>GitHub Profile</span>
                </a>
            </motion.div>
        </section>
    );
};

export default Contact;
