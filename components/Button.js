import Link from 'next/link';

const Button = ({ text, href, alt }) =>
  alt ? (
    <Link
      className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-teal-700 bg-teal-100 hover:bg-teal-200'
      href={href}
    >
      {text}
    </Link>
  ) : (
    <Link
      className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-t2kTeal hover:bg-teal-500'
      href={href}
    >
      {text}
    </Link>
  );

export default Button;
