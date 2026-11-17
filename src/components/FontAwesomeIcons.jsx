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
  faSun,
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
  faBookOpen,
  faEnvelope,
  faKey,
  faLightbulb,
  faFloppyDisk,
  faGear,
  faClipboardList,
  faChartColumn,
  faChartLine,
  faTriangleExclamation,
  faCircleCheck,
  faCircleXmark,
  faTrashCan,
  faPenToSquare,
  faPlus,
  faFileExport,
  faFileImport,
  faEye,
  faEyeSlash,
  faPaperPlane,
  faCircle,
  faHandPointUp,
  faArrowsUpDownLeftRight,
  faFire,
  faFaceSmile,
  faFaceLaughSquint,
  faGaugeHigh,
  faAward,
  faMedal,
  faMagnifyingGlass,
  faUserSecret,
  faFingerprint,
  faRobot
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

// Occasion Icons (Moon, Ring, Graduation Cap, Coffee, Magnifying Glass)
export function OccasionIcon({ occasionId, className = '', style, ...props }) {
  let icon = faMugHot;
  if (occasionId === 'eid') icon = faMoon;
  else if (occasionId === 'wedding') icon = faRing;
  else if (occasionId === 'exam') icon = faGraduationCap;
  else if (occasionId === 'general') icon = faMugHot;
  else if (occasionId === 'aunty007') icon = faMagnifyingGlass;

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

// Professional Admin & Theme Icons
export function SunIcon(props) { return <FontAwesomeIcon icon={faSun} {...props} />; }
export function MoonIcon(props) { return <FontAwesomeIcon icon={faMoon} {...props} />; }
export function EnvelopeIcon(props) { return <FontAwesomeIcon icon={faEnvelope} {...props} />; }
export function KeyIcon(props) { return <FontAwesomeIcon icon={faKey} {...props} />; }
export function LightbulbIcon(props) { return <FontAwesomeIcon icon={faLightbulb} {...props} />; }
export function SaveIcon(props) { return <FontAwesomeIcon icon={faFloppyDisk} {...props} />; }
export function GearIcon(props) { return <FontAwesomeIcon icon={faGear} {...props} />; }
export function ClipboardListIcon(props) { return <FontAwesomeIcon icon={faClipboardList} {...props} />; }
export function ChartBarIcon(props) { return <FontAwesomeIcon icon={faChartColumn} {...props} />; }
export function ChartLineIcon(props) { return <FontAwesomeIcon icon={faChartLine} {...props} />; }
export function WarningIcon(props) { return <FontAwesomeIcon icon={faTriangleExclamation} {...props} />; }
export function SuccessIcon(props) { return <FontAwesomeIcon icon={faCircleCheck} {...props} />; }
export function ErrorIcon(props) { return <FontAwesomeIcon icon={faCircleXmark} {...props} />; }
export function TrashIcon(props) { return <FontAwesomeIcon icon={faTrashCan} {...props} />; }
export function EditIcon(props) { return <FontAwesomeIcon icon={faPenToSquare} {...props} />; }
export function PlusIcon(props) { return <FontAwesomeIcon icon={faPlus} {...props} />; }
export function ExportIcon(props) { return <FontAwesomeIcon icon={faFileExport} {...props} />; }
export function ImportIcon(props) { return <FontAwesomeIcon icon={faFileImport} {...props} />; }
export function EyeIcon(props) { return <FontAwesomeIcon icon={faEye} {...props} />; }
export function EyeSlashIcon(props) { return <FontAwesomeIcon icon={faEyeSlash} {...props} />; }
export function PaperPlaneIcon(props) { return <FontAwesomeIcon icon={faPaperPlane} {...props} />; }
export function CircleDotIcon(props) { return <FontAwesomeIcon icon={faCircle} {...props} />; }
export function HandPointIcon(props) { return <FontAwesomeIcon icon={faHandPointUp} {...props} />; }
export function DragIcon(props) { return <FontAwesomeIcon icon={faArrowsUpDownLeftRight} {...props} />; }
export function FireIcon(props) { return <FontAwesomeIcon icon={faFire} {...props} />; }
export function SmileIcon(props) { return <FontAwesomeIcon icon={faFaceSmile} {...props} />; }
export function LaughIcon(props) { return <FontAwesomeIcon icon={faFaceLaughSquint} {...props} />; }
export function GaugeIcon(props) { return <FontAwesomeIcon icon={faGaugeHigh} {...props} />; }
export function AwardIcon(props) { return <FontAwesomeIcon icon={faAward} {...props} />; }
export function MedalIcon(props) { return <FontAwesomeIcon icon={faMedal} {...props} />; }
export function MagnifyingGlassIcon(props) { return <FontAwesomeIcon icon={faMagnifyingGlass} {...props} />; }
export function UserSecretIcon(props) { return <FontAwesomeIcon icon={faUserSecret} {...props} />; }
export function FingerprintIcon(props) { return <FontAwesomeIcon icon={faFingerprint} {...props} />; }
export function RobotIcon(props) { return <FontAwesomeIcon icon={faRobot} {...props} />; }
