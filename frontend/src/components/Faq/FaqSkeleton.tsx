import React from 'react';

const FaqSkeleton = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>FAQs</li>
        </ul>
      </div>

      <p className="text-2xl font-semibold mb-4">Frequently Asked Questions</p>

      { children }

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="skeleton h-64 w-full md:w-80"></div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    </>
  );
};

export default FaqSkeleton;
