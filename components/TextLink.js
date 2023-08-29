import Link from 'next/link';

const TextLink = ({ text, href, externalLink = false }) =>
  externalLink ? (
    <a
      className='text-t2kTeal hover:text-teal-600 transition'
      href={href}
      rel='noopener'
      target='_blank'
    >
      {text}
    </a>
  ) : (
    <Link className='text-t2kTeal hover:text-teal-600 transition' href={href}>
      {text}
    </Link>
  );

export default TextLink;
