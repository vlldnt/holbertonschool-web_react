import BodySection from './BodySection';

function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className="bodySectionWithMargin mb-6 tablet:mb-8 desktop:mb-10">
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
}

export default BodySectionWithMarginBottom;
