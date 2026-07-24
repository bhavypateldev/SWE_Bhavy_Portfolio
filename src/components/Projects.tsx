import React from 'react';
import styles from './Projects.module.css';
import { portfolioData } from '../data';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

const Projects: React.FC = () => {
    return (
        <section className={styles.projectsContainer} id="work">
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className={styles.title}>Selected Work</h2>
            </motion.div>

            <motion.div
                className={styles.grid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {portfolioData.projects.map((project, index) => {
                    const isExternal = project.link.startsWith('http');
                    return (
                        <motion.a
                            href={project.link}
                            key={index}
                            className={`${styles.projectCard} ${index === 0 ? styles.featured : ''}`}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                        >
                            {index === 0 && (
                                <span className={styles.featuredBadge}>✦ New</span>
                            )}
                            <div className={styles.cardTop}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                {isExternal ? (
                                    <Github size={18} className={styles.linkIcon} />
                                ) : (
                                    <ArrowUpRight size={18} className={styles.linkIcon} />
                                )}
                            </div>
                            <p className={styles.description}>{project.description}</p>
                            <div className={styles.techStack}>
                                {project.tech.map((tech, idx) => (
                                    <span key={idx} className={styles.techTag}>{tech}</span>
                                ))}
                            </div>
                            {isExternal && (
                                <span className={styles.viewRepo}>
                                    View on GitHub <ArrowUpRight size={14} />
                                </span>
                            )}
                        </motion.a>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default Projects;
