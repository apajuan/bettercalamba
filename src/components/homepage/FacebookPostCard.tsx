import { FC } from 'react';

import { ArrowRight, MessageCircle, Pin, ThumbsUp } from 'lucide-react';

import type { FacebookPost } from '@/data/facebook';

import Avatar from './Avatar';
import ImagePlaceholder from './ImagePlaceholder';
import VerifiedBadge from './VerifiedBadge';

interface FacebookPostCardProps {
  post: FacebookPost;
}

/** Highlighted (pinned/popular) social post card with image and engagement. */
const FacebookPostCard: FC<FacebookPostCardProps> = ({ post }) => (
  <article className='group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d8dbdf] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#acc8ef] hover:shadow-[0_12px_22px_-10px_rgba(0,12,46,0.2)] focus-within:ring-2 focus-within:ring-calamba-blue focus-within:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0'>
    <div className='flex items-center gap-[11px] px-4 pt-4'>
      <Avatar
        useSeal={post.useSeal}
        name={post.pageName}
        initials={post.initials}
        color={post.avatarColor}
        size={40}
      />
      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-[5px]'>
          <span className='truncate text-sm leading-tight font-bold text-[#1e2124]'>
            {post.pageName}
          </span>
          {post.official && <VerifiedBadge size={14} />}
        </div>
        <span className='font-mono text-[11px] text-[#abb2ba]'>
          {post.meta}
        </span>
      </div>
      {post.pinned && (
        <span className='inline-flex flex-none items-center gap-1 rounded-md border border-[#acc8ef] bg-calamba-blue-light px-2 py-0.5 text-[9.5px] font-bold tracking-[0.06em] text-calamba-blue uppercase'>
          <Pin className='h-2.5 w-2.5' aria-hidden='true' />
          Pinned
        </span>
      )}
    </div>

    <p className='mx-4 mt-[13px] line-clamp-3 text-[13.5px] leading-relaxed text-[#49525b]'>
      {post.text}
    </p>

    <div className='relative mx-4 mt-[14px] h-[148px] overflow-hidden rounded-[10px]'>
      <ImagePlaceholder variant='light' label={post.photoLabel} />
    </div>

    <div className='mt-auto flex items-center justify-between px-4 pt-[13px] pb-4'>
      <div
        data-print-hide
        className='flex items-center gap-3 font-mono text-[11.5px] text-[#596570]'
      >
        <span className='inline-flex items-center gap-1'>
          <ThumbsUp className='h-3 w-3' aria-hidden='true' />
          <strong className='text-[#1e2124]'>{post.reactions}</strong> reactions
        </span>
        <span className='inline-flex items-center gap-1'>
          <MessageCircle className='h-3 w-3' aria-hidden='true' />
          {post.comments}
        </span>
      </div>
      <a
        href={post.postUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-1 rounded-sm text-[12.5px] font-bold whitespace-nowrap text-calamba-blue transition-colors hover:text-[#002885] focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none'
      >
        View post
        <ArrowRight className='h-3.5 w-3.5' aria-hidden='true' />
      </a>
    </div>
  </article>
);

export default FacebookPostCard;
