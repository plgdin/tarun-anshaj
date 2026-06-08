import type { Video, VideoCategory } from '@/types/video';

export const categories: VideoCategory[] = [
  { id: 'short', title: 'Shorts', slug: 'short' },
  { id: 'youtube', title: 'YouTube', slug: 'youtube' },
];

export const videos: Video[] = [
  {
    id: 'v1',
    title: 'Echoes of Silence',
    category: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    duration: '1:20',
    year: '2024',
    description: 'Short Film • Director & Writer • 1.2M Views',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
  {
    id: 'v2',
    title: 'Behind the Lens',
    category: 'short',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    duration: '0:30',
    year: '2024',
    description: 'Cinematic Reels • Actor • 500K Views',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
  {
    id: 'v3',
    title: 'The Midnight Screenplay',
    category: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
    duration: '10:00',
    year: '2023',
    description: 'Writing Masterclass • Writer • 850K Views',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
  {
    id: 'v4',
    title: 'Monologue Series',
    category: 'short',
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80',
    duration: '1:00',
    year: '2024',
    description: 'TikTok Drama • Actor • 2.1M Views',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
  {
    id: 'v5',
    title: 'Indie Film Breakdown',
    category: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    duration: '5:00',
    year: '2023',
    description: 'Director Commentary • 400K Views',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
  {
    id: 'v6',
    title: 'Scene Study: Hamlet',
    category: 'short',
    thumbnail: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80',
    duration: '2:00',
    year: '2023',
    description: 'Instagram Reels • Actor • 3.5M Views',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  },
];

export const featuredVideo = {
  title: 'Showreel',
  description: 'Showreel video',
  videoUrl: '/6.mp4',
  thumbnail: '',
};
