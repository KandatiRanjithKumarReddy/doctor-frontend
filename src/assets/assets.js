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
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: '12, 100 Feet Road, Indiranagar',
            line2: 'Bengaluru, Karnataka - 560038'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily Larson provides compassionate gynecological care, prenatal evaluations, and specialized women wellness treatments.',
        fees: 600,
        address: {
            line1: 'Plot 45, Road No. 36, Jubilee Hills',
            line2: 'Hyderabad, Telangana - 500033'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Sarah Patel focuses on clinical dermatology, skincare therapies, and evidence-based solutions for chronic skin disorders.',
        fees: 500,
        address: {
            line1: 'Shop 14, Linking Road, Bandra West',
            line2: 'Mumbai, Maharashtra - 400050'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christopher Lee is dedicated to pediatric wellness, routine vaccinations, and developmental milestones monitoring for children.',
        fees: 500,
        address: {
            line1: '22, Ring Road, Lajpat Nagar IV',
            line2: 'New Delhi, Delhi - 110024'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia specializes in neurological assessments, headache management, and comprehensive disorders of the nervous system.',
        fees: 800,
        address: {
            line1: '88, Anna Salai, T. Nagar',
            line2: 'Chennai, Tamil Nadu - 600017'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Andrew Williams provides in-depth neurological consultations focusing on stroke rehabilitation and neuromuscular therapy.',
        fees: 800,
        address: {
            line1: '15, FC Road, Shivajinagar',
            line2: 'Pune, Maharashtra - 411005'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Christopher Davis has extensive experience in general internal medicine, lifestyle condition management, and preventive screenings.',
        fees: 500,
        address: {
            line1: '104, Salt Lake Sector V',
            line2: 'Kolkata, West Bengal - 700091'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Timothy White is committed to obstetric consultations, maternal care, and preventive health guidance for women of all age groups.',
        fees: 600,
        address: {
            line1: '31, Beach Road, Maharanipeta',
            line2: 'Visakhapatnam, Andhra Pradesh - 530002'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Ava Mitchell is skilled in contemporary dermatological therapies, allergy identification, and personalized skin treatment plans.',
        fees: 500,
        address: {
            line1: '56, CG Road, Navrangpura',
            line2: 'Ahmedabad, Gujarat - 380009'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Jeffrey King provides compassionate care for infants and adolescents, specializing in pediatric diagnostics and seasonal health.',
        fees: 500,
        address: {
            line1: '18, Hazratganj, Park Road',
            line2: 'Lucknow, Uttar Pradesh - 226001'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly provides specialized neurological diagnostic workups, migraine therapies, and continuous neuro-wellness care.',
        fees: 800,
        address: {
            line1: '29, MG Road, Ashok Nagar',
            line2: 'Bengaluru, Karnataka - 560001'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Patrick Harris has a proven track record in nerve function assessments, spine-related nerve issues, and holistic neurology.',
        fees: 800,
        address: {
            line1: '72, Hitech City Main Road, Madhapur',
            line2: 'Hyderabad, Telangana - 500081'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Chloe Evans provides patient-centric primary consultations, routine health checkups, and chronic ailment therapies.',
        fees: 500,
        address: {
            line1: '41, Senapati Bapat Marg, Lower Parel',
            line2: 'Mumbai, Maharashtra - 400013'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez delivers comprehensive gynecological consultations, fertility counseling, and post-natal support.',
        fees: 600,
        address: {
            line1: '63, South Extension Part 2',
            line2: 'New Delhi, Delhi - 110049'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Amelia Hill provides personalized dermatological care, acne management, and cosmetic dermatology counseling.',
        fees: 500,
        address: {
            line1: '9, KNK Road, Nungambakkam',
            line2: 'Chennai, Tamil Nadu - 600034'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Arthur Conners',
        image: doc16,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD - Gastroenterology',
        experience: '5 Years',
        about: 'Dr. Arthur Conners specializes in clinical digestive health, endoscopy, and inflammatory bowel diseases, focusing on preventative medicine and modern gastrointestinal care.',
        fees: 900,
        address: {
            line1: '14, 80 Feet Road, Koramangala 4th Block',
            line2: 'Bengaluru, Karnataka - 560034'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Elena Vance',
        image: doc17,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, FACG',
        experience: '4 Years',
        about: 'Dr. Elena Vance provides expert care in managing acid reflux, liver wellness, and general gastrointestinal evaluations with modern diagnostic strategies.',
        fees: 1000,
        address: {
            line1: '7th Phase, KPHB Colony, Kukatpally',
            line2: 'Hyderabad, Telangana - 500072'
        }
    },
    {
        _id: 'doc18',
        name: 'Dr. Marcus Brody',
        image: doc18,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MRCP',
        experience: '6 Years',
        about: 'Dr. Marcus Brody has extensive experience in digestive system wellness, nutritional therapies, and clinical gastroenterology consultations.',
        fees: 1200,
        address: {
            line1: '52, SV Road, Andheri West',
            line2: 'Mumbai, Maharashtra - 400058'
        }
    }
]