import BodySection from './BodySection';

function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className="bodySectionWithMargin mb-[40px]">
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
}

export default BodySectionWithMarginBottom;
