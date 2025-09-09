

interface PropsPageDescription {
    title: string, 
    description: string
}
export const PageDescription = ({title, description}: PropsPageDescription) => {
  return (
    <div className="w-full space-y-2">
      <p className="md:text-4xl font-bold">{title}</p>
      <p className="text-md text-gray-400 font-semibold">
        {description}
      </p>
    </div>
  );
};
