import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faFacebookMessenger,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import {
  faPlay,
  faPause,
  faShuffle,
  faRotateRight,
  faRotateLeft,
  faDownload,
  faShareNodes,
  faCopy,
  faCheck,
  faCircleInfo,
  faCircleQuestion,
  faStar,
  faVolumeHigh,
  faVolumeXmark,
  faTableCellsLarge,
  faTableCells,
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faXmark,
  faMoon,
  faRing,
  faGraduationCap,
  faMugHot,
  faWandMagicSparkles,
  faGamepad,
  faTrophy,
  faHeart,
  faShieldHalved,
  faUsers,
  faLock,
  faClock,
  faBullseye,
  faRulerCombined,
  faMobileScreen,
  faBolt,
  faComments,
  faCamera,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons';

export function FaIcon({ icon, className = '', ...props }) {
  return <FontAwesomeIcon icon={icon} className={className} {...props} />;
}

// Brand Icons
export function InstagramIcon({ className = '', style, ...props }) {
  return <FontAwesomeIcon icon={faInstagram} className={className} style={style} {...props} />;
}

export function FacebookIcon({ className = '', style, ...props }) {
  return <FontAwesomeIcon icon={faFacebook} className={className} style={style} {...props} />;
}

export function MessengerIcon({ className = '', style, ...props }) {
  return <FontAwesomeIcon icon={faFacebookMessenger} className={className} style={style} {...props} />;
}

export function WhatsAppIcon({ className = '', style, ...props }) {
  return <FontAwesomeIcon icon={faWhatsapp} className={className} style={style} {...props} />;
}

// Occasion Icons (Moon, Ring, Graduation Cap, Coffee)
export function OccasionIcon({ occasionId, className = '', style, ...props }) {
  let icon = faMugHot;
  if (occasionId === 'eid') icon = faMoon;
  else if (occasionId === 'wedding') icon = faRing;
  else if (occasionId === 'exam') icon = faGraduationCap;
  else if (occasionId === 'general') icon = faMugHot;

  return <FontAwesomeIcon icon={icon} className={className} style={style} {...props} />;
}

// General UI Icons
export function PlayIcon(props) { return <FontAwesomeIcon icon={faPlay} {...props} />; }
export function PauseIcon(props) { return <FontAwesomeIcon icon={faPause} {...props} />; }
export function ShuffleIcon(props) { return <FontAwesomeIcon icon={faShuffle} {...props} />; }
export function ResetIcon(props) { return <FontAwesomeIcon icon={faRotateRight} {...props} />; }
export function RotateLeftIcon(props) { return <FontAwesomeIcon icon={faRotateLeft} {...props} />; }
export function DownloadIcon(props) { return <FontAwesomeIcon icon={faDownload} {...props} />; }
export function ShareIcon(props) { return <FontAwesomeIcon icon={faShareNodes} {...props} />; }
export function CopyIcon(props) { return <FontAwesomeIcon icon={faCopy} {...props} />; }
export function CheckIcon(props) { return <FontAwesomeIcon icon={faCheck} {...props} />; }
export function InfoIcon(props) { return <FontAwesomeIcon icon={faCircleInfo} {...props} />; }
export function QuestionIcon(props) { return <FontAwesomeIcon icon={faCircleQuestion} {...props} />; }
export function StarIcon(props) { return <FontAwesomeIcon icon={faStar} {...props} />; }
export function VolumeHighIcon(props) { return <FontAwesomeIcon icon={faVolumeHigh} {...props} />; }
export function VolumeXmarkIcon(props) { return <FontAwesomeIcon icon={faVolumeXmark} {...props} />; }
export function Grid3x3Icon(props) { return <FontAwesomeIcon icon={faTableCellsLarge} {...props} />; }
export function Grid5x5Icon(props) { return <FontAwesomeIcon icon={faTableCells} {...props} />; }
export function ArrowLeftIcon(props) { return <FontAwesomeIcon icon={faArrowLeft} {...props} />; }
export function ArrowRightIcon(props) { return <FontAwesomeIcon icon={faArrowRight} {...props} />; }
export function ChevronDownIcon(props) { return <FontAwesomeIcon icon={faChevronDown} {...props} />; }
export function CloseIcon(props) { return <FontAwesomeIcon icon={faXmark} {...props} />; }
export function SparklesIcon(props) { return <FontAwesomeIcon icon={faWandMagicSparkles} {...props} />; }
export function GamepadIcon(props) { return <FontAwesomeIcon icon={faGamepad} {...props} />; }
export function TrophyIcon(props) { return <FontAwesomeIcon icon={faTrophy} {...props} />; }
export function HeartIcon(props) { return <FontAwesomeIcon icon={faHeart} {...props} />; }
export function ShieldIcon(props) { return <FontAwesomeIcon icon={faShieldHalved} {...props} />; }
export function UsersIcon(props) { return <FontAwesomeIcon icon={faUsers} {...props} />; }
export function LockIcon(props) { return <FontAwesomeIcon icon={faLock} {...props} />; }
export function ClockIcon(props) { return <FontAwesomeIcon icon={faClock} {...props} />; }
export function BullseyeIcon(props) { return <FontAwesomeIcon icon={faBullseye} {...props} />; }
export function RulerIcon(props) { return <FontAwesomeIcon icon={faRulerCombined} {...props} />; }
export function MobileIcon(props) { return <FontAwesomeIcon icon={faMobileScreen} {...props} />; }
export function BoltIcon(props) { return <FontAwesomeIcon icon={faBolt} {...props} />; }
export function CommentsIcon(props) { return <FontAwesomeIcon icon={faComments} {...props} />; }
export function CameraIcon(props) { return <FontAwesomeIcon icon={faCamera} {...props} />; }
export function BookOpenIcon(props) { return <FontAwesomeIcon icon={faBookOpen} {...props} />; }
