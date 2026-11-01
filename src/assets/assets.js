import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import doc16 from './doc16.png'
import doc17 from './doc17.png'
import doc18 from './doc18.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    doc16,
    doc17,
    doc18
}

export { doc16, doc17, doc18 }

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Rohan Deshmukh',
        image: doc1,
        available: true,
        speciality: 'General physician',
        degree: 'MBBS, MD (Internal Medicine)',
        experience: '8 Years',
        about: 'Dr. Rohan Deshmukh is an internal medicine specialist with over 8 years of outpatient and hospital care experience. He focuses on viral and seasonal fevers, hypertension, thyroid disorders, diabetes management, and preventive adult health checkups. Patients appreciate his clear explanations, thorough symptom review, and practical lifestyle guidance.',
        fees: 700,
        address: {
            clinic: 'Manipal Hospital, Indiranagar',
            line1: 'Manipal Hospital, 100 Feet Road, Indiranagar',
            line2: 'Bengaluru, Karnataka - 560038'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Sunita Rao',
        image: doc2,
        available: true,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (Obstetrics & Gynecology)',
        experience: '12 Years',
        about: 'Dr. Sunita Rao brings 12 years of dedicated experience in women’s health, prenatal care, PCOS management, and menstrual wellness. She provides evidence-based obstetric consultations, pre-pregnancy counseling, and routine gynecological screenings in a calm, supportive clinic setting.',
        fees: 1500,
        address: {
            clinic: 'Fernandez Stork Home, Jubilee Hills',
            line1: 'Fernandez Stork Home, Road No. 36, Jubilee Hills',
            line2: 'Hyderabad, Telangana - 500033'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Siddharth Patel',
        image: doc3,
        available: true,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
        experience: '7 Years',
        about: 'Dr. Siddharth Patel is a board-certified clinical dermatologist specializing in persistent acne, eczema, fungal skin infections, hair fall evaluation, and allergic rashes. He emphasizes accurate root-cause assessment and simple, sustainable skincare routines tailored to Indian skin types and climates.',
        fees: 1000,
        address: {
            clinic: 'Lilavati Skin & Derma Care, Bandra West',
            line1: 'Lilavati Skin & Derma Care, Linking Road, Bandra West',
            line2: 'Mumbai, Maharashtra - 400050'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Arjun Malhotra',
        image: doc4,
        available: true,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '6 Years',
        about: 'Dr. Arjun Malhotra cares for newborns, infants, and school-age children with a gentle, parent-friendly approach. His consultations cover childhood immunizations, growth and nutrition tracking, childhood allergies, and acute respiratory or digestive illnesses, helping parents feel confident and well-informed.',
        fees: 800,
        address: {
            clinic: "Rainbow Children's Hospital, Malviya Nagar",
            line1: "Rainbow Children's Hospital, Geetanjali Marg, Malviya Nagar",
            line2: 'New Delhi, Delhi - 110017'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Niharika Iyer',
        image: doc5,
        available: true,
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM (Neurology)',
        experience: '8 Years',
        about: 'Dr. Niharika Iyer specializes in clinical neurology with particular focus on chronic migraines, vertigo, nerve pain, sleep-related headaches, and seizure disorders. She combines structured neurological evaluations with clear long-term care plans to help patients regain daily comfort.',
        fees: 2000,
        address: {
            clinic: 'Kauvery Hospital Neuro Centre, Alwarpet',
            line1: 'Kauvery Hospital Neuro Centre, TTK Road, Alwarpet',
            line2: 'Chennai, Tamil Nadu - 600018'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Rajeshwar Joshi',
        image: doc6,
        available: true,
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM (Neurology)',
        experience: '13 Years',
        about: 'Dr. Rajeshwar Joshi has 13 years of experience evaluating stroke recovery, peripheral neuropathy, tremors, movement disorders, and spine-related nerve compression. He takes a methodical, patient-centered approach to neurological testing and coordinated follow-up rehabilitation.',
        fees: 2600,
        address: {
            clinic: 'Ruby Hall Clinic, Sassoon Road',
            line1: 'Ruby Hall Clinic, 40 Sassoon Road, Sangamvadi',
            line2: 'Pune, Maharashtra - 411001'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Vikramaditya Sen',
        image: doc7,
        available: true,
        speciality: 'General physician',
        degree: 'MBBS, MD (General Medicine), FRCP',
        experience: '16 Years',
        about: 'Dr. Vikramaditya Sen is a senior general physician with 16 years of experience managing complex multi-system illnesses, blood pressure and lipid disorders, adult vaccinations, and unexplained fatigue or prolonged fevers. He focuses on careful clinical listening and avoiding unnecessary tests.',
        fees: 900,
        address: {
            clinic: 'Apollo Multispeciality Hospital, Salt Lake',
            line1: 'Apollo Multispeciality Hospital, Canal Circular Road, Salt Lake',
            line2: 'Kolkata, West Bengal - 700054'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Karthik Subramanian',
        image: doc8,
        available: true,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (OBG), DNB',
        experience: '9 Years',
        fees: 1200,
        address: {
            clinic: "CARE Hospitals Women's Centre, Ram Nagar",
            line1: "CARE Hospitals Women's Centre, Waltair Main Road, Ram Nagar",
            line2: 'Visakhapatnam, Andhra Pradesh - 530002'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Meera Krishnan',
        image: doc9,
        available: true,
        speciality: 'Dermatologist',
        degree: 'MBBS, DDVL, Fellowship in Clinical Dermatology',
        experience: '6 Years',
        about: 'Dr. Meera Krishnan treats everyday and chronic skin, hair, and nail concerns including pigmentation, urticaria (hives), psoriasis, dandruff, and teenage acne. She focuses on gentle, evidence-backed dermatology plans and educates patients on sun protection and trigger prevention.',
        fees: 900,
        address: {
            clinic: 'Zydus Skin & Wellness Clinic, Navrangpura',
            line1: 'Zydus Skin & Wellness Clinic, CG Road, Navrangpura',
            line2: 'Ahmedabad, Gujarat - 380009'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Pranav Kulkarni',
        image: doc10,
        available: true,
        speciality: 'Pediatricians',
        degree: 'MBBS, DCH, DNB (Pediatrics)',
        experience: '10 Years',
        about: 'Dr. Pranav Kulkarni has spent a decade caring for infants, toddlers, and adolescents across outpatient pediatrics and developmental clinics. He advises families on childhood asthma, seasonal infections, picky eating, milestone checks, and catch-up vaccination schedules.',
        fees: 1200,
        address: {
            clinic: 'Medanta Super Specialty Clinic, Gomti Nagar',
            line1: 'Medanta Super Specialty Clinic, Vibhuti Khand, Gomti Nagar',
            line2: 'Lucknow, Uttar Pradesh - 226010'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Nandini Chatterjee',
        image: doc11,
        available: true,
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DNB (Neurology), Stroke Fellowship',
        experience: '15 Years',
        about: 'Dr. Nandini Chatterjee is a senior consultant neurologist with 15 years of expertise in stroke prevention, epilepsy, memory and cognitive evaluations, and refractory headache syndromes. She provides detailed diagnostic reviews and coordinates closely with families on long-term neurological wellness.',
        fees: 3500,
        address: {
            clinic: 'Fortis Hospital, Bannerghatta Road',
            line1: 'Fortis Hospital, 154/9 Bannerghatta Main Road',
            line2: 'Bengaluru, Karnataka - 560076'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Harsha Vardhan Reddy',
        image: doc12,
        available: true,
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM (Neurology), FINR',
        experience: '19 Years',
        about: 'Dr. Harsha Vardhan Reddy is a senior director-level neurologist with 19 years of clinical experience in complex neurovascular conditions, Parkinson’s disease, demyelinating disorders, and second-opinion neurological consultations. Known for his thorough diagnostic precision, he guides patients through complex neurological reports in clear, reassuring language.',
        fees: 5000,
        address: {
            clinic: 'Yashoda Hospitals Neurosciences Institute, Hitec City',
            line1: 'Yashoda Hospitals Neurosciences Institute, Hitec City Main Road',
            line2: 'Hyderabad, Telangana - 500081'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Kavya Nair',
        image: doc13,
        available: true,
        speciality: 'General physician',
        degree: 'MBBS, DNB (Family Medicine)',
        experience: '5 Years',
        about: 'Dr. Kavya Nair practices comprehensive family and primary medicine, helping adults and seniors with acute infections, blood sugar and blood pressure monitoring, nutritional deficiencies, and annual health report reviews. Her consultations focus on practical everyday care and early preventive action.',
        fees: 500,
        address: {
            clinic: 'Kokilaben Ambani Family Clinic, Andheri West',
            line1: 'Kokilaben Ambani Family Clinic, Four Bungalows, Andheri West',
            line2: 'Mumbai, Maharashtra - 400053'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Nikhil Verma',
        image: doc14,
        available: true,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (OBG), Fellowship in Reproductive Medicine',
        experience: '14 Years',
        about: 'Dr. Nikhil Verma has 14 years of specialized experience in reproductive health, fertility evaluation, minimally invasive gynecological consultations, and hormonal health. He works closely with couples and individual patients to create transparent, personalized care plans.',
        fees: 2200,
        address: {
            clinic: 'Max Smart Super Speciality Hospital, Saket',
            line1: 'Max Smart Super Speciality Hospital, Press Enclave Marg, Saket',
            line2: 'New Delhi, Delhi - 110017'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Ananya Reddy',
        image: doc15,
        available: true,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology), FAAD',
        experience: '11 Years',
        about: 'Dr. Ananya Reddy brings 11 years of clinical dermatology experience managing stubborn acne scarring, melasma, chronic dermatitis, alopecia, and sensitive skin conditions. She combines thorough medical dermatology workups with safe, realistic treatment timelines.',
        fees: 1600,
        address: {
            clinic: 'Apollo Skin & Hair Studio, Nungambakkam',
            line1: 'Apollo Skin & Hair Studio, Khader Nawaz Khan Road, Nungambakkam',
            line2: 'Chennai, Tamil Nadu - 600034'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Arvind Sharma',
        image: doc16,
        available: true,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD, DM (Medical Gastroenterology)',
        experience: '15 Years',
        about: 'Dr. Arvind Sharma is a senior medical gastroenterologist with 15 years of experience treating acid reflux (GERD), gastritis, irritable bowel syndrome (IBS), fatty liver disease, and inflammatory bowel conditions. He emphasizes dietary clarity alongside modern diagnostic gastroenterology.',
        fees: 2000,
        address: {
            clinic: 'Aster CMI Hospital, Hebbal',
            line1: 'Aster CMI Hospital, NH 44, Sahakar Nagar, Hebbal',
            line2: 'Bengaluru, Karnataka - 560092'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Sarah Jenkins',
        image: doc17,
        available: true,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD, FACG (Gastroenterology & Hepatology)',
        experience: '14 Years',
        about: 'Dr. Sarah Jenkins is a consultant gastroenterologist and hepatologist with 14 years of clinical experience in liver wellness, chronic indigestion, food intolerances, peptic ulcer care, and preventive digestive screenings. She is known for structured symptom tracking and clear nutritional guidance.',
        fees: 2800,
        address: {
            clinic: 'AIG Hospitals, Gachibowli',
            line1: 'AIG Hospitals, Mindspace Road, Gachibowli',
            line2: 'Hyderabad, Telangana - 500032'
        }
    },
    {
        _id: 'doc18',
        name: 'Dr. Alan Thompson',
        image: doc18,
        available: true,
        speciality: 'Gastroenterologist',
        degree: 'MD, FRCP (Senior Consultant Gastroenterologist)',
        experience: '24 Years',
        about: 'Dr. Alan Thompson is a senior visiting consultant gastroenterologist with 24 years of international and tertiary-hospital experience in complex pancreaticobiliary disorders, chronic liver disease, motility disorders, and second-opinion digestive consultations.',
        fees: 4500,
        address: {
            clinic: 'Breach Candy Hospital Trust, South Mumbai',
            line1: 'Breach Candy Hospital Trust, 60A Bhulabhai Desai Road',
            line2: 'Mumbai, Maharashtra - 400026'
        }
    }
]
