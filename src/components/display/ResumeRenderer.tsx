
import React from 'react';
import { ResumeData, Theme } from '@/types/resume';
import { ResumeHeader } from './ResumeHeader';
import { WorkSection } from './WorkSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { OtherSections } from './OtherSections';

interface ResumeRendererProps {
  resumeData: ResumeData;
  theme: Theme;
  className?: string;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ 
  resumeData, 
  theme, 
  className = '' 
}) => {
  // Safely destructure sectionVisibility with fallback
  const sectionVisibility = resumeData?.sectionVisibility || {
    basics: true,
    work: true,
    education: true,
    skills: true,
    projects: true,
    awards: true,
    certificates: true,
    publications: true,
    languages: true,
    interests: true,
    references: true,
    volunteer: true
  };

  // Early return if resumeData is not available
  if (!resumeData) {
    return <div>Loading...</div>;
  }

  // Ensure basics exists
  const basics = resumeData.basics || {
    name: '',
    label: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    image: '',
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: ''
    },
    profiles: []
  };

  // Ensure arrays exist
  const work = resumeData.work || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
  const projects = resumeData.projects || [];
  const awards = resumeData.awards || [];
  const certificates = resumeData.certificates || [];
  const publications = resumeData.publications || [];
  const languages = resumeData.languages || [];
  const interests = resumeData.interests || [];
  const references = resumeData.references || [];
  const volunteer = resumeData.volunteer || [];

  const themeStyles = {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-text': theme.colors.text,
    '--color-text-secondary': theme.colors.textSecondary,
    '--color-background': theme.colors.background,
    '--color-border': theme.colors.border,
    '--font-heading': theme.fonts.heading,
    '--font-body': theme.fonts.body,
    '--font-family': theme.typography.fontFamily,
    '--font-size': `${theme.typography.fontSize}px`,
    '--line-height': theme.typography.lineHeight,
    '--spacing-section': theme.spacing.section,
    '--spacing-item': theme.spacing.item,
  } as React.CSSProperties;

  return (
    <div 
      className={`resume-renderer ${className}`}
      style={themeStyles}
      data-testid="resume-renderer"
    >
      <div 
        className="bg-white shadow-lg max-w-4xl mx-auto relative" 
        style={{ 
          fontFamily: 'var(--font-family)', 
          fontSize: 'var(--font-size)',
          lineHeight: 'var(--line-height)'
        }}
      >
        {/* Icon rendering - maintains aspect ratio with single size value */}
        {resumeData.icon?.data && resumeData.icon.position && resumeData.icon.size && (
          <img 
            src={resumeData.icon.data}
            alt="Resume icon"
            className="absolute"
            style={{
              top: `${resumeData.icon.position.top || 20}px`,
              right: `${resumeData.icon.position.right || 20}px`,
              width: `${resumeData.icon.size || 60}px`,
              height: `${resumeData.icon.size || 60}px`,
              objectFit: 'contain'
            }}
          />
        )}

        {/* Photo rendering - mirrors icon API; by default users can set top/right/size. */}
        {resumeData.photo?.data && resumeData.photo.position && resumeData.photo.size && (
          <img
            src={resumeData.photo.data}
            alt="Resume photo"
            className="absolute rounded-sm"
            style={{
              top: `${resumeData.photo.position.top || 20}px`,
              right: `${resumeData.photo.position.right || 100}px`,
              width: `${resumeData.photo.size || 60}px`,
              height: `${resumeData.photo.size || 60}px`,
              objectFit: 'cover'
            }}
          />
        )}
        
        <ResumeHeader basics={basics} isVisible={sectionVisibility.basics} />

        <div className="p-8" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          <WorkSection work={work} isVisible={sectionVisibility.work} />
          <EducationSection education={education} isVisible={sectionVisibility.education} />
          <SkillsSection skills={skills} isVisible={sectionVisibility.skills} />
          <OtherSections
            projects={projects}
            volunteer={volunteer}
            awards={awards}
            certificates={certificates}
            publications={publications}
            languages={languages}
            interests={interests}
            references={references}
            sectionVisibility={{
              projects: sectionVisibility.projects,
              volunteer: sectionVisibility.volunteer,
              awards: sectionVisibility.awards,
              certificates: sectionVisibility.certificates,
              publications: sectionVisibility.publications,
              languages: sectionVisibility.languages,
              interests: sectionVisibility.interests,
              references: sectionVisibility.references,
            }}
          />
        </div>
      </div>
    </div>
  );
};
