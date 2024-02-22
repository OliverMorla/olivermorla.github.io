interface SocialMediaButtonProps {
  title: string;
  pathUrl: string | URL;
  iconUrl: any;
  transitionDelay: number;
}

interface NavLinkProps {
  title: string;
  pathUrl: string | URL;
  fontAwesomeIconUrl?: any;
  transitionDelay: number;
}

interface NavLinkWithMenuProps {
  title: string;
  pathUrl: string | URL;
  fontAwesomeIconUrl: any;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  transitionDelay: number;
}

interface MobileNavLinkProps {
  title: string;
  pathUrl: string | URL;
  transitionDelay: number;
  isMenuOpen: boolean;
}

interface ButtonProps {
  title: string;
  iconUrl?: string | undefined;
  fontAwesomeIconUrl?: any;
}

interface ServiceCardProps {
  title: string;
  fontAwesomeIconUrl: any;
  transitionDelay: number;
  description: string;
}

interface ExperienceCardProps {
  companyName: string;
  jobPosition: string;
  jobResponsibilities: string[];
  jobLocation: string;
  jobStartDate: string;
  jobEndDate: string;
}

interface EducationCardProps {
  educationInstitution: string;
  educationDegree: string;
  fontAwesomeIconUrl?: any;
}

interface CounterProps {
  duration: number;
  targetCount: number;
}

interface CertificationCardProps {
  title: string;
  institution: string;
}

interface SectionTitleProps {
  title: string;
  desc: string;
}

interface RepositoryCardProps {
  name: string;
  html_url: string;
  homepage: string;
  description: string;
}
