// EVM Myths vs Reality — structured, content-driven data
// This replaces the hardcoded 1300-line inline component cards

export const myths = [
  {
    id: 1,
    myth: "Someone can hack it from home using Python.",
    tag: "Cybersecurity",
    icon: "shield",
    color: "blue",
    reality: "EVMs are completely isolated devices. They have no WiFi, Bluetooth, cellular, or internet connection. The machine uses custom firmware burned onto non-rewritable memory, and the hardware is tamper-sealed. You cannot 'SSH into an EVM' because it doesn't have a network stack — there is no IP address, no open port, and no operating system you can log into.",
    facts: [
      "EVMs operate entirely offline during polling",
      "Firmware is burned onto non-rewritable chips",
      "No WiFi, Bluetooth, or cellular modules exist in the hardware",
      "Serial communication is one-way and physically secured"
    ],
    illustration: "no-connection"
  },
  {
    id: 2,
    myth: "Every electronic machine is connected to the internet.",
    tag: "Connectivity",
    icon: "wifi-off",
    color: "green",
    reality: "This is a fundamental misunderstanding of how EVMs function. EVMs are standalone, battery-powered devices that do not connect to any network. The Control Unit (CU) and Ballot Unit (BU) communicate only through a dedicated, shielded serial cable that carries one-way signals. There is no modem, no antenna, no internet protocol stack — the concept of 'being hacked online' simply does not apply.",
    facts: [
      "EVMs are battery-powered and never connect to power mains during voting",
      "CU and BU connect only via physical serial cable",
      "No network interface cards (NICs) are present in the hardware",
      "Result counting is done by physically reading the memory device"
    ],
    illustration: "offline"
  },
  {
    id: 3,
    myth: "If I know coding, I can hack anything.",
    tag: "Technical Skills",
    icon: "code",
    color: "orange",
    reality: "Hacking an EVM is not a coding challenge — it's a physical and logistical impossibility for unauthorized individuals. You would first need physical access to sealed, guarded hardware. Then you'd need to reverse-engineer proprietary firmware without triggering tamper-evident seals. Then modify the firmware without breaking the checksum verification. And do all of this while being watched by party representatives at every step.",
    facts: [
      "Proprietary firmware — no public source code to examine",
      "Tamper-evident seals on every critical component",
      "Multi-party observers present during entire process",
      "Checksum verification runs before every election"
    ],
    illustration: "layers"
  },
  {
    id: 4,
    myth: "Technology security is only software.",
    tag: "Holistic Security",
    icon: "lock",
    color: "purple",
    reality: "EVM security is not a single layer — it is a multi-layered fortress combining technology, physical security, transparent processes, and independent verification. The software is just one small piece. Physical seals, random deployment of machines, mock polls conducted in public, VVPAT paper trails, and multi-party observation are all equally critical security layers that work together.",
    facts: [
      "VVPAT (Voter Verified Paper Audit Trail) provides physical verification",
      "Randomization prevents targeted manipulation",
      "Mock polls are conducted publicly before every election",
      "Multi-party agents observe the entire process",
      "Strong room storage with armed guards between phases"
    ],
    illustration: "fortress"
  }
];

export const votingSteps = [
  { id: 1, title: 'Voter Verification', description: 'Verify identity with polling officer' },
  { id: 2, title: 'Ballot Activation', description: 'Officer enables the ballot unit' },
  { id: 3, title: 'Vote Selection', description: 'Press the button for your chosen candidate' },
  { id: 4, title: 'VVPAT Confirmation', description: 'Verify and confirm your vote' }
];

export const candidates = [
  { id: 1, symbol: 'Triangle', name: 'Candidate A', party: 'Party A', color: 'bg-blue-500' },
  { id: 2, symbol: 'Circle', name: 'Candidate B', party: 'Party B', color: 'bg-green-500' },
  { id: 3, symbol: 'Square', name: 'Candidate C', party: 'Party C', color: 'bg-orange-500' },
  { id: 4, symbol: 'Diamond', name: 'Candidate D', party: 'Party D', color: 'bg-purple-500' }
];

export const securityLayers = [
  {
    title: "Physical Security",
    description: "Tamper-evident seals, guarded strong rooms, and physical inspection by multi-party agents.",
    icon: "shield-check",
    points: ["Sealed components", "24/7 guarded storage", "Physical inspection protocols"]
  },
  {
    title: "Software Integrity",
    description: "Custom firmware on non-rewritable memory with cryptographic checksum verification.",
    icon: "fingerprint",
    points: ["Burned firmware", "Cryptographic checksums", "No external software loading"]
  },
  {
    title: "Process Transparency",
    description: "Mock polls, randomization, and continuous multi-party observation ensure fairness.",
    icon: "users",
    points: ["Public mock polls", "Algorithmic randomization", "Agent presence required"]
  },
  {
    title: "Voter Verification",
    description: "VVPAT paper trail allows voters to verify their choice and enables post-election audits.",
    icon: "file-check",
    points: ["Physical paper slip", "Voter visual confirmation", "Audit trail maintained"]
  }
];

export const faqs = [
  {
    question: "What is an EVM?",
    answer: "An Electronic Voting Machine (EVM) is a standalone electronic device used for recording votes in elections. It consists of a Control Unit (operated by the polling officer) and a Ballot Unit (where voters press buttons to cast their votes)."
  },
  {
    question: "Can EVMs be hacked remotely?",
    answer: "No. EVMs are completely isolated devices with no internet, WiFi, Bluetooth, or cellular connectivity. They do not have network interfaces, IP addresses, or any way to connect to external networks. The only communication is via a dedicated physical cable between the Control Unit and Ballot Unit."
  },
  {
    question: "What is VVPAT?",
    answer: "VVPAT stands for Voter Verified Paper Audit Trail. After you press the button, a paper slip is printed showing your candidate's name and symbol. You can see this slip through a window for 7 seconds before it drops into a sealed box. This provides a physical record of your vote for verification and audits."
  },
  {
    question: "How do political parties ensure EVMs are fair?",
    answer: "Political parties send representatives (polling agents) who observe every stage: machine sealing, transport, setup, voting, and counting. Mock polls are conducted in front of these agents before the actual election to verify the machine is working correctly."
  },
  {
    question: "What happens if an EVM malfunctions?",
    answer: "If an EVM malfunctions, it is immediately replaced with a reserve machine. The malfunctioning machine is tagged, sealed, and sent for technical examination. The poll continues without interruption."
  },
  {
    question: "Who manufactures EVMs in India?",
    answer: "EVMs are manufactured by two government-owned companies: Bharat Electronics Limited (BEL) and Electronics Corporation of India Limited (ECIL). Both operate under the supervision of the Election Commission of India."
  },
  {
    question: "How are EVMs stored between elections?",
    answer: "After voting, EVMs are sealed and stored in strong rooms with 24/7 armed police guard. These rooms have multiple locks, with keys held by different officials. Agents from political parties also keep watch over these strong rooms."
  },
  {
    question: "Can someone change votes after they are cast?",
    answer: "No. Once a vote is recorded, it is stored in non-volatile memory that cannot be altered. The Control Unit stores votes sequentially with no mechanism for editing, deletion, or reordering. The sealed VVPAT slips provide a separate physical record for cross-verification."
  }
];
