export const portfolioData = {
    personal: {
        name: "Hey! I am Bhavy",
        role: "Software Engineer & Security Analyst",
        bio: [
            "Information Systems Technology student",
            "passionate about building full-stack",
            "applications and data-driven systems, with a",
            "strong focus on performance, reliability, and security."
        ],
        about: "I am a Computer Science student passionate about the intersection of Software Engineering and Cybersecurity. My expertise lies in building secure full-stack applications, vulnerability assessment, and algorithm optimization. I strive to develop robust software that stands up to modern security challenges.",
        contact: {
            email: "bhavypatel1223@gmail.com", // TODO: Update with your email
            linkedin: "https://www.linkedin.com/in/bhavy-patel23/", // TODO: Update with your LinkedIn URL
            github: "https://github.com/bhavy2312"
        }
    },
    links: [
        {
            text: "View my Projects",
            url: "#work",
            type: "work"
        },
        {
            text: "View my Resume",
            // Use Vite's BASE_URL to correctly link to the public asset regardless of deployment path
            url: import.meta.env.BASE_URL + "resume.pdf",
            type: "person"
        }
    ],
    skills: [
        { category: "Languages", items: ["Java", "Python", "C++", "TypeScript", "SQL", "Bash"] },
        { category: "Security", items: ["Penetration Testing", "Network Security", "Cryptography", "OWASP Top 10", "Wireshark"] },
        { category: "Development", items: ["React", "Node.js", "Next.js", "Docker", "AWS", "Git"] },
        { category: "Core CS", items: ["Data Structures", "Algorithms", "OS", "Computer Networks", "DBMS"] }
    ],
    projects: [
        {
            title: "Secure E-Commerce Platform",
            description: "A full-stack e-commerce app with implemented security best practices, including JWT authentication, input sanitization, and secure payment processing.",
            tech: ["React", "Node.js", "MongoDB", "OAuth 2.0"],
            link: "#"
        },
        {
            title: "Network Vulnerability Scanner",
            description: "Automated tool for scanning local networks to identify open ports and potential vulnerabilities, generating detailed security reports.",
            tech: ["Python", "Nmap", "Scapy", "Linux"],
            link: "#"
        },
        {
            title: "Encrypted Chat Application",
            description: "Real-time messaging application featuring end-to-end encryption to ensure user privacy and data integrity.",
            tech: ["Go", "WebSockets", "AES-256", "React"],
            link: "#"
        }
    ]
};
