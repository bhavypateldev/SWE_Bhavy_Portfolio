export const portfolioData = {
    personal: {
        name: "Hey! I am Bhavy",
        role: "Software Engineer & Security Analyst",
        bio: [
            "Computer Science student at Cal State Fullerton focused on",
            "building scalable software and secure systems through full-stack",
            "development and cybersecurity."
        ],
        about: "Computer Science student at Cal State Fullerton focused on building scalable software and secure systems through full-stack development and cybersecurity. Experienced with vulnerability assessment, algorithm optimization, and delivering reliable software solutions.",
        contact: {
            email: "bhavypatel1223@gmail.com", // TODO: Update with your email
            linkedin: "https://www.linkedin.com/in/bhavy-patel23/", // TODO: Update with your LinkedIn URL
            github: "https://github.com/bhavypateldev"
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
            title: "AI Music Recommender Simulation",
            description: "A content-based music recommender system that scores songs using weighted proximity formulas across 12 audio features and 15 genres. Simulates how platforms like Spotify generate personalized playlists from user taste profiles.",
            tech: ["Python", "AI/ML", "Content-Based Filtering", "Data Analysis"],
            link: "https://github.com/bhavypateldev/ai110-module3show-musicrecommendersimulation-starter"
        },
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
