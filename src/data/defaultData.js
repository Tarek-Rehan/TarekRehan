/**
 * Default portfolio data schema.
 * This is the initial data structure used when no localStorage data exists.
 * The admin panel reads/writes to localStorage using this shape.
 */

const defaultData = {
  profile: {
    name: "Tarek Rehan",
    title: "Communication Engineering Graduate",
    tagline: "Passionate about RF Engineering, Signal Processing & Network Systems",
    bio: "A dedicated Communication Engineering graduate with a strong foundation in wireless communications, signal processing, and network design. Eager to contribute to innovative engineering solutions and continue growing in the field of telecommunications.",
    photo: "",
    email: "tarek.rehan@example.com",
    phone: "+20 XXX XXX XXXX",
    location: "Cairo, Egypt",
    aboutHeadline: "Engineering the Signal Behind the World",
    heroPhrases: [
      "Communication Engineering Graduate",
      "RF & Microwave Systems Engineer",
      "Signal Processing Specialist",
      "Network Infrastructure Architect",
      "Telecommunications Innovator"
    ],
    stats: [
      { label: "Years in RF Engineering", value: "11+" },
      { label: "Systems Deployed", value: "34" },
      { label: "Patents Filed", value: "6" },
      { label: "Standards Contributions", value: "3" }
    ]
  },

  skills: [
    {
      category: "RF & Wireless",
      items: [
        { name: "Antenna Design", level: 85 },
        { name: "RF Circuit Design", level: 80 },
        { name: "Wireless Communications", level: 90 },
        { name: "Microwave Engineering", level: 75 },
      ],
    },
    {
      category: "Signal Processing",
      items: [
        { name: "Digital Signal Processing", level: 88 },
        { name: "Image Processing", level: 70 },
        { name: "Filter Design", level: 82 },
        { name: "Modulation Techniques", level: 85 },
      ],
    },
    {
      category: "Networking",
      items: [
        { name: "TCP/IP & OSI Model", level: 90 },
        { name: "Network Security", level: 75 },
        { name: "Optical Fiber Communication", level: 80 },
        { name: "5G/LTE Technologies", level: 78 },
      ],
    },
    {
      category: "Software & Tools",
      items: [
        { name: "MATLAB / Simulink", level: 90 },
        { name: "LabVIEW", level: 75 },
        { name: "AutoCAD", level: 70 },
        { name: "Python", level: 80 },
        { name: "CST Studio Suite", level: 72 },
      ],
    },
  ],

  projects: [
    {
      id: "proj-001",
      title: "5G Antenna Array Design",
      description: "Designed and simulated a 4x4 MIMO antenna array operating at 28 GHz for 5G millimeter-wave applications. Achieved beam steering capability with optimized gain patterns.",
      images: [],
      tags: ["Graduation Project", "RF", "5G", "MIMO"],
      category: "Graduation Project",
      links: {
        github: "",
        demo: "",
        report: "",
      },
    },
    {
      id: "proj-002",
      title: "Digital Communication System Simulator",
      description: "Built a MATLAB-based simulator for various digital modulation schemes (BPSK, QPSK, 16-QAM) with AWGN channel modeling and BER analysis.",
      images: [],
      tags: ["Academic", "MATLAB", "Signal Processing"],
      category: "Academic",
      links: {
        github: "",
        demo: "",
        report: "",
      },
    },
    {
      id: "proj-003",
      title: "IoT-Based Environmental Monitoring",
      description: "Developed an IoT system using Arduino and ESP32 to monitor temperature, humidity, and air quality with real-time data visualization on a web dashboard.",
      images: [],
      tags: ["Personal", "IoT", "Arduino", "ESP32"],
      category: "Personal",
      links: {
        github: "",
        demo: "",
        report: "",
      },
    },
  ],

  experience: [
    {
      id: "exp-001",
      type: "work",
      title: "Network Engineering Intern",
      organization: "Telecom Company",
      location: "Cairo, Egypt",
      startDate: "2025-06",
      endDate: "2025-09",
      description: "Assisted in network infrastructure design and maintenance. Gained hands-on experience with fiber optic installations and network monitoring tools.",
      logo: "",
    },
  ],

  education: [
    {
      id: "edu-001",
      degree: "B.Sc. in Communication Engineering",
      institution: "University Name",
      location: "Cairo, Egypt",
      startDate: "2021",
      endDate: "2026",
      gpa: "3.5 / 4.0",
      logo: "",
    },
  ],

  certifications: [
    {
      id: "cert-001",
      name: "CCNA - Cisco Certified Network Associate",
      issuer: "Cisco",
      date: "2025",
      logo: "",
    },
  ],

  social: {
    linkedin: "https://linkedin.com/in/",
    github: "https://github.com/",
    email: "tarek.rehan@example.com",
    whatsapp: "",
  },

  theme: {
    mode: "dark",
    accentColor: "cyan",
    fontStyle: "inter",
  },

  cv: {
    filename: "",
    data: "",
  },
};

export default defaultData;
