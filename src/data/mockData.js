import {
  Activity,
  Bell,
  ClipboardList,
  FilePenLine,
  LayoutDashboard,
  MessageCircle,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    mobileLabel: "Home",
    path: "/doctor/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Patients",
    mobileLabel: "Patients",
    path: "/doctor/patients",
    icon: UsersRound,
  },
  {
    label: "Patient Record",
    mobileLabel: "Records",
    path: "/doctor/patient-records",
    icon: ClipboardList,
  },
  {
    label: "Messages",
    mobileLabel: "Chats",
    path: "/doctor/messages",
    icon: MessageCircle,
  },
  {
    label: "Profile",
    mobileLabel: "Profile",
    path: "/doctor/profile",
    icon: UserRound,
  },
];

export const doctorInfo = {
  name: "Professor Dr. Md. Tofael Hossain Bhuiyan",
  id: "DOC-7861",
  specialization: "MS Neuro Surgery, Brain, Nerve, Spine & Stroke Specialist",
  department: "Professor & Head of Neurosurgery",
  photo:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
  qualification: "এমএস নিউরো সার্জারী, ব্রেইন, নার্ভ ও স্পাইন বিশেষজ্ঞ",
  contact: "+880 1711-000000",
  email: "dr.tofael@rangpurcmch.org",
  bio: "Neuro surgery specialist focused on brain, nerve, spine and stroke care with evidence-based treatment planning.",
  chamber: "রংপুর মেডিকেল কলেজ ও হাসপাতাল, রংপুর",
  hospitalNameBn: "রংপুর কমিউনিটি মেডিকেল কলেজ হাসপাতাল",
  doctorNameBn: "অধ্যাপক ডাঃ মোঃ তোফায়েল হোসাইন ভূঁইয়া",
  doctorTitleBn: "এমএস নিউরো সার্জারী, ব্রেইন, নার্ভ ও স্পাইন বিশেষজ্ঞ",
  hospitalNameEn: "Rangpur Community Medical College Hospital",
  doctorNameEn: "Professor Dr. Md. Tofael Hossain Bhuiyan",
  doctorTitleEn: "MS Neuro Surgery, Brain, Nerve, Spine & Stroke Specialist",
  designationEn: "Professor & Head of Neurosurgery",
  schedule: [
    { day: "Sun - Tue", hours: "09:00 AM - 01:00 PM" },
    { day: "Wed - Thu", hours: "05:00 PM - 09:00 PM" },
  ],
};

export const dashboardStats = [
  { title: "Total Patients Today", value: 38, trend: "+12%", icon: UsersRound },
  { title: "Waiting", value: 9, trend: "-2 from 11 AM", icon: Activity },
  { title: "Completed", value: 21, trend: "+6 since noon", icon: FilePenLine },
  { title: "Urgent Cases", value: 3, trend: "Needs review", icon: Bell },
];

export const todaySession = {
  title: "Today's Chamber Session",
  chamber: "Dhanmondi Branch, Room 302",
  slot: "09:00 AM - 01:00 PM",
  assistant: "Shafin (Assistant)",
  queueStatus: "Running on time",
};

export const quickActions = [
  { title: "View Patients", icon: UsersRound, path: "/doctor/patients" },
  {
    title: "Open Prescription",
    icon: FilePenLine,
    path: "/doctor/patients/P-1003",
  },
  { title: "Open Messages", icon: MessageCircle, path: "/doctor/messages" },
  { title: "Edit Profile", icon: UserRound, path: "/doctor/profile" },
];

export const forwardedCases = [
  {
    id: "FWD-01",
    patientId: "P-1003",
    name: "Nabila Akter",
    summary:
      "Persistent fever for 5 days with new chest discomfort. Needs rapid review.",
    assistantNote: "Vitals fluctuating. Suggest CBC + CXR.",
    priority: "Urgent",
  },
  {
    id: "FWD-02",
    patientId: "P-1016",
    name: "Mahmud Hossain",
    summary:
      "Type-2 diabetic follow-up, high fasting glucose trend over last week.",
    assistantNote: "Brought previous reports. Wants medication update.",
    priority: "High",
  },
];

export const notifications = [
  "Lab report arrived for P-0991.",
  "Assistant flagged 2 urgent queue updates.",
  "Profile verification is 92% complete.",
];

export const patientFilters = [
  "All",
  "Next",
  "Waiting",
  "Skipped",
  "In Progress",
  "Completed",
  "Urgent",
  "Forwarded",
];

export const patients = [
  {
    id: "P-1001",
    name: "Sadia Islam",
    complaint: "Migraine with nausea",
    age: 29,
    serial: "A-01",
    status: "Next",
    timeSlot: "09:10 AM",
    forwarded: false,
  },
  {
    id: "P-1002",
    name: "Rafiqul Alam",
    complaint: "Blood pressure follow-up",
    age: 47,
    serial: "A-02",
    status: "Waiting",
    timeSlot: "09:20 AM",
    forwarded: false,
  },
  {
    id: "P-1003",
    name: "Nabila Akter",
    complaint: "Fever and chest discomfort",
    age: 35,
    serial: "A-03",
    status: "Urgent",
    timeSlot: "09:25 AM",
    forwarded: true,
    assistantNote: "Vitals unstable in triage.",
  },
  {
    id: "P-1004",
    name: "Tahmid Karim",
    complaint: "Gastritis pain",
    age: 31,
    serial: "A-04",
    status: "In Progress",
    timeSlot: "09:40 AM",
    forwarded: false,
  },
  {
    id: "P-1005",
    name: "Ayesha Sultana",
    complaint: "Post-viral fatigue",
    age: 42,
    serial: "A-05",
    status: "Skipped",
    timeSlot: "09:55 AM",
    forwarded: false,
  },
  {
    id: "P-1006",
    name: "Kazi Imran",
    complaint: "Diabetes routine review",
    age: 54,
    serial: "A-06",
    status: "Completed",
    timeSlot: "10:15 AM",
    forwarded: true,
    assistantNote: "Requested diet chart update.",
  },
];

export const patientDetailsTemplate = {
  patientName: "Nabila Akter",
  patientId: "P-1003",
  age: 35,
  gender: "Female",
  complaint: "Persistent fever, fatigue, chest tightness",
  visitDate: "13 Apr 2026",
  doctorName: "Professor Dr. Md. Tofael Hossain Bhuiyan",
  department: "Professor & Head of Neurosurgery",
  hospitalNameBn: "রংপুর কমিউনিটি মেডিকেল কলেজ হাসপাতাল",
  doctorNameBn: "অধ্যাপক ডাঃ মোঃ তোফায়েল হোসাইন ভূঁইয়া",
  doctorTitleBn: "এমএস নিউরো সার্জারী, ব্রেইন, নার্ভ ও স্পাইন বিশেষজ্ঞ",
  hospitalNameEn: "Rangpur Community Medical College Hospital",
  doctorNameEn: "Professor Dr. Md. Tofael Hossain Bhuiyan",
  doctorTitleEn: "MS Neuro Surgery, Brain, Nerve, Spine & Stroke Specialist",
  designationEn: "Professor & Head of Neurosurgery",
  assistantNote:
    "Patient reports persistent headache with neck pain and dizziness at night. Monitor neuro-vitals and urgent review if weakness progresses.",
};

export const conversations = [
  {
    id: "C-01",
    name: "Nabila Akter",
    role: "Patient • P-1003",
    lastMessage: "Doctor, should I continue the current antibiotic tonight?",
    time: "2m",
    unread: 2,
    avatar: "NA",
  },
  {
    id: "C-02",
    name: "Shafin Ahmed",
    role: "Assistant",
    lastMessage: "3 forwarded patients are marked urgent.",
    time: "10m",
    unread: 0,
    avatar: "SA",
  },
  {
    id: "C-03",
    name: "Rafiqul Alam",
    role: "Patient • P-1002",
    lastMessage: "I uploaded my BP chart.",
    time: "18m",
    unread: 1,
    avatar: "RA",
  },
];

export const chatMessages = {
  "C-01": [
    {
      id: 1,
      from: "other",
      text: "Assalamualaikum doctor, fever is still high after lunch.",
      time: "10:12 AM",
    },
    {
      id: 2,
      from: "me",
      text: "Walaikum assalam. Please share your latest temperature now.",
      time: "10:13 AM",
    },
    {
      id: 3,
      from: "other",
      text: "It is 101.2°F and chest feels tight sometimes.",
      time: "10:14 AM",
    },
  ],
  "C-02": [
    {
      id: 1,
      from: "other",
      text: "Good morning doctor, queue updated.",
      time: "09:40 AM",
    },
    {
      id: 2,
      from: "me",
      text: "Thanks, please prioritize urgent tags.",
      time: "09:42 AM",
    },
  ],
  "C-03": [
    {
      id: 1,
      from: "other",
      text: "Uploaded BP logs for this week.",
      time: "08:58 AM",
    },
    {
      id: 2,
      from: "me",
      text: "Received. I will review before consultation.",
      time: "09:01 AM",
    },
  ],
};

export const statusColors = {
  Next: "teal",
  Waiting: "mint",
  "In Progress": "cyan",
  Completed: "slate",
  Skipped: "amber",
  Urgent: "red",
  Forwarded: "violet",
};

export const profileSections = [
  {
    title: "Professional Details",
    rows: [
      { label: "Department", value: doctorInfo.department },
      { label: "Specialization", value: doctorInfo.specialization },
      { label: "Qualification", value: doctorInfo.qualification },
    ],
  },
  {
    title: "Contact",
    rows: [
      { label: "Phone", value: doctorInfo.contact },
      { label: "Email", value: doctorInfo.email },
      { label: "Chamber", value: doctorInfo.chamber },
    ],
  },
];

export const dashboardHighlights = [
  { label: "Performance Score", value: "94%", icon: Activity },
  { label: "Avg. Wait Time", value: "12m", icon: Stethoscope },
  { label: "Patient Satisfaction", value: "4.8/5", icon: Bell },
];
