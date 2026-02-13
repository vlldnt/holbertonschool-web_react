function BodySection({ title, children }) {
  return (
    <div className="bodySection mt-4 tablet:mt-6 desktop:mt-8">
      <h2 className="font-bold text-lg tablet:text-xl desktop:text-2xl mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default BodySection;
